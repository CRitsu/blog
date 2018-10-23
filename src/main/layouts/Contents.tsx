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

    return (
      <div className="contents">
        {loading
          ? <Loading>{t('loading')}</Loading>
          : (
            <div className="article">
              <h1 className="title">{article.title}</h1>
              <div className="article-info">
                <span>{article.author}</span>
                <span>{formatDate(article.timestamp, SHORT_TIME_FORMAT)}</span>
              </div>
              <div className="article-content"
                dangerouslySetInnerHTML={{ __html: marked(article.content) }} />
              <div className="comments">
                {article.comments.map((comment: Comments) => (
                  <div className="comment" key={comment.cid}>
                  <div className="head">
                    <div className="from">{comment.from}</div>
                    <div className="time">{formatDate(comment.timestamp, NORMAL_TIME_FORMAT)}</div>
                  </div>
                    <div className="body">{comment.body}</div>
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
