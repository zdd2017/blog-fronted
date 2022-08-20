import { ApiService } from './index'

class ArticleService extends ApiService {
  public page(params) {
    return this.$get('page', params)
  }
}

export const articleService = new ArticleService('article')
