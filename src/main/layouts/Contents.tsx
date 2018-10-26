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

interface Props extends ContentsType, Translate, ReduxDispatch {
  aid: string,
}

marked.setOptions({
  highlight: (code, lang) => {
    return highlight(lang, code).value;
  },
  langPrefix: 'hljs '
})

class Contents extends React.Component<Props> {

  public state = {
    loading: this.props.article === null ? true : false,
  }

  public componentDidMount() {
    const { aid, dispatch, article } = this.props;
    if (dispatch !== undefined && article === null) {
      dispatch(fetchArticle(aid));
    }
    if (article !== null) {
      this.setState({ loading: false });
    }

    // scroll to top when displayed
    window.scrollTo(0, 0);
  }

  public render() {

    const { t, loading } = this.props;

    const article = checkArticle(this.props.article);

    article.content = article.content ? article.content : '';
    article.comments = article.comments ? article.comments : [];

    const ThumbUp = (props: {className?: string}) => (
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
              <div className="comments">
                {article.comments.map((comment: Comments) => (
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
                        <button className="reply">{t('reply')}</button>
                      </div>
                      <div className="reply-body">
                        <div className="your-avatar">avatar</div>
                        <textarea name={comment.cid} className="reply-input" />
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
