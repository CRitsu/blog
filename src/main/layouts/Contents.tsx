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

    const ThumbUp = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" className="thumb-up">
        <path d="M4.438 0c-.19.021-.34.149-.438.344-.13.26-1.101 2.185-1.281 2.375-.19.18-.439.281-.719.281v4.001h3.5c.21 0 .389-.133.469-.313 0 0 1.031-2.908 1.031-3.188 0-.28-.22-.5-.5-.5h-1.5c-.28 0-.5-.25-.5-.5s.389-1.574.469-1.844c.08-.27-.053-.545-.313-.625l-.219-.031zm-4.438 3v4h1v-4h-1z" id="thumb-up" />
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
                      <div className="button">
                        <button><ThumbUp /></button>
                        <button>dislike</button>
                        <button>{t('reply')}</button>
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
