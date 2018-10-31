import { highlight } from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import * as marked from 'marked';
import * as React from 'react';
import { translate } from 'react-i18next';
import { NORMAL_TIME_FORMAT, SHORT_TIME_FORMAT } from 'src/constants';
import { fetchArticle } from 'src/reducers/creators';
import { checkArticle, formatDate } from 'src/utils';
import { Comments, ContentsType, ReduxDispatch, ReplyType, Translate } from '../../types';
import Loading from '../accessories/Loading';
import ThumbUp from '../accessories/ThumbUp';


// settings of markdown parser
marked.setOptions({
  // for syntax highlight
  highlight: (code, lang) => {
    // use highlight.js
    return highlight(lang, code).value;
  },
  // for highlight class prefix
  langPrefix: 'hljs '
})


interface Props extends ContentsType, Translate, ReduxDispatch {
  aid: string,
}

interface State {
  replyFlg: boolean[],
  comment: string,
  reply: string[]
}


class Contents extends React.Component<Props, State> {

  public state = {
    comment: '',
    reply: Array<string>(),
    replyFlg: Array<boolean>(),
  }

  public commentsRef = Array<HTMLTextAreaElement>();

  public constructor(props: Props) {
    super(props);
    this.handleClickReplyButton = this.handleClickReplyButton.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleReplyChange = this.handleReplyChange.bind(this);
    this.setRefObject = this.setRefObject.bind(this);
  }

  public componentDidMount() {

    const { aid, dispatch, article } = this.props;
    // perform fetch action if article is not exists
    if (dispatch !== undefined && article === null) {
      dispatch(fetchArticle(aid));
    }

    // scroll to top when displayed
    window.scrollTo(0, 0);
  }

  /**
   * Handler for reply button click event.
   * 
   * Trigger reply body display by set specified replyFlg to true or false.
   * @param index index
   */
  public handleClickReplyButton(index: number) {

    return () => {
      // get copy of flag array
      const flg = this.state.replyFlg.slice();
      // trigger flag
      flg[index] = !flg[index];
      // apply new flags
      this.setState({ replyFlg: flg }, () => {
        // set focus as a callback (setState is asynchronous)
        const ref = this.commentsRef[index];
        ref.focus();
      });
    }
  }

  /**
   * Handler for comment input changed.
   * @param e event object
   */
  public handleCommentChange(e: React.FormEvent) {
    const target = e.target as HTMLTextAreaElement;
    this.setState({ comment: target.value });
  }

  /**
   * Handler for replies input changed.
   * @param index index
   */
  public handleReplyChange(index: number) {
    return (e: React.FormEvent) => {
      const target = e.target as HTMLTextAreaElement;
      const reply = this.state.reply.slice();
      reply[index] = target.value;
      this.setState({ reply });
    }
  }

  /**
   * Get row count by check how many times this \n was inputted.
   * 
   * Return 1 when str is not defined.
   * @param str string
   */
  public getRowCount(str?: string) {
    // check for safe
    if (str === undefined) {
      return 1;
    }
    const matches = str.match(/\n/g);
    return matches ? matches.length + 1 : 1;
  }

  /**
   * Check if reply list is undefined then return new array,
   * otherwise return reply list.
   * @param reply reply list
   */
  public getReplyList(reply: ReplyType[] | undefined) {
    if (reply !== undefined) {
      return reply;
    } else {
      return [];
    }
  }

  /**
   * Reference object setter for focus textarea element.
   * @param i index
   */
  public setRefObject(i: number) {
    return (element: HTMLTextAreaElement) => this.commentsRef[i] = element;
  }

  public render() {

    const { t, loading } = this.props;
    const { replyFlg, comment, reply } = this.state;

    const article = checkArticle(this.props.article);
    article.content = article.content ? article.content : '';
    article.comments = article.comments ? article.comments : [];

    for (let i = 0; i < article.comments.length; i++) {
      // set reply input body display flag
      article.comments[i].replyFlg = !!replyFlg[i];
    }

    const {
      handleClickReplyButton,
      handleCommentChange,
      handleReplyChange,
      getRowCount,
      setRefObject,
      getReplyList
    } = this;

    return (
      <div className="contents">
        {loading
          ? <Loading>{t('loading')}</Loading>
          : (
            <div className="article">

              <h1 className="title">{article.title}</h1>

              <div className="article-info">
                <span>{formatDate(article.timestamp, SHORT_TIME_FORMAT)}</span>
                <span>{t(article.category)}</span>
              </div>

              <div className="article-content"
                dangerouslySetInnerHTML={{ __html: marked(article.content) }} />

              <div className="leave-comment">
                <div className="avatar">avatar</div>
                <textarea className="comment-input" placeholder={t('add a comment')}
                  onChange={handleCommentChange} value={comment} rows={getRowCount(comment)} />
                <button className="comment-submit">{t('comment')}</button>
              </div>

              <div className="comments">
                {article.comments.map((c: Comments, i: number) => (
                  <div className="comment" key={c.cid}>

                    <div className="avatar">avatar</div>

                    <div className="main">

                      <div className="head">
                        <div className="from">{c.from}</div>
                        <div className="time">{formatDate(c.timestamp, NORMAL_TIME_FORMAT)}</div>
                      </div>

                      <div className="body">{c.body}</div>

                      <div className="buttons">
                        <button className="like active" title={t('like')}>
                          <ThumbUp />123
                        </button>
                        <button className="dislike" title={t('dislike')}>
                          <ThumbUp />123
                        </button>
                        <button className="reply" onClick={handleClickReplyButton(i)}>{t('reply')}</button>
                      </div>

                      <div className={`reply-body ${c.replyFlg ? 'active' : ''}`}>
                        <div className="avatar">avatar</div>
                        <textarea name={c.cid} className="reply-input" value={reply[i] ? reply[i] : ''}
                          onChange={handleReplyChange(i)} ref={setRefObject(i)}
                          rows={getRowCount(reply[i])} placeholder={t('add a reply')} />
                        <button className="reply-submit">{t('reply')}</button>
                      </div>

                      {getReplyList(c.reply).map((r: ReplyType) => (
                        <div className="reply-list">
                          <div className="avatar">avatar</div>
                          <div className="main">
                            <div className="head">
                              <div className="from">{r.from}</div>
                              <div className="time">{formatDate(r.timestamp, NORMAL_TIME_FORMAT)}</div>
                            </div>
                            <div className="body">{r.body}</div>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                ))}
              </div>

            </div>
          )
        }
      </div>
    )
  }
}

export default translate()(Contents);
