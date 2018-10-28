import { highlight } from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import * as marked from 'marked';
import * as React from 'react';
import { translate } from 'react-i18next';
import { NORMAL_TIME_FORMAT, SHORT_TIME_FORMAT } from 'src/constants';
import { fetchArticle } from 'src/reducers/creators';
import { checkArticle, formatDate } from 'src/utils';
import { Comments, ContentsType, ReduxDispatch, Translate } from '../../types';
import Loading from '../accessories/Loading';


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
}


class Contents extends React.Component<Props, State> {

  public state = {
    replyFlg: Array<boolean>(),
  }

  public commentsRef = Array<HTMLTextAreaElement>();

  public constructor(props: Props) {
    super(props);
    this.handleClickReplyButton = this.handleClickReplyButton.bind(this);
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

  public render() {

    const { t, loading } = this.props;
    const { replyFlg } = this.state;
    // const { replyFlg, commentsRef } = this.state;

    const article = checkArticle(this.props.article);
    article.content = article.content ? article.content : '';
    article.comments = article.comments ? article.comments : [];

    for (let i = 0; i < article.comments.length; i++) {
      // set reply input body display flag
      article.comments[i].replyFlg = !!replyFlg[i];
    }

    const replyButtonClickHandlerWrapper = (i: number) => {
      return () => this.handleClickReplyButton(i);
    }

    const setRefObject = (i: number) => {
      return (element: HTMLTextAreaElement) => this.commentsRef[i] = element;
    }

    const ThumbUp = (props: { className?: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`thumb-up ${props.className}`}>
        <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" />
      </svg>
    )

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
                <textarea className="comment-input" placeholder={t('add a comment')} />
                <button className="comment-submit">{t('comment')}</button>
              </div>
              <div className="comments">
                {article.comments.map((comment: Comments, i: number) => (
                  <div className="comment" key={comment.cid}>
                    <div className="avatar">avatar</div>
                    <div className="main">
                      <div className="head">
                        <div className="from">{comment.from}</div>
                        <div className="time">{formatDate(comment.timestamp, NORMAL_TIME_FORMAT)}</div>
                      </div>
                      <div className="body">{comment.body}</div>
                      <div className="buttons">
                        <button className="like active" title={t('like')}>
                          <ThumbUp />1234
                        </button>
                        <button className="dislike" title={t('dislike')}>
                          <ThumbUp />1234
                        </button>
                        <button className="reply" onClick={replyButtonClickHandlerWrapper(i)}>{t('reply')}</button>
                      </div>
                      <div className={`reply-body ${comment.replyFlg ? 'active' : ''}`}>
                        <div className="your-avatar">avatar</div>
                        <textarea name={comment.cid} className="reply-input" ref={setRefObject(i)} placeholder={t('add a reply')}/>
                        <button className="reply-submit">{t('reply')}</button>
                      </div>
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
