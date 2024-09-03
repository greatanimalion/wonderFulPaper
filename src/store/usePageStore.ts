import { defineStore } from 'pinia'
import { Page, PageStore, Pagedefault } from '@/types/page'
import { message } from 'ant-design-vue';
import pageDefault from '@/const/pageDefault';

const usePageStore = defineStore('page', {
  state: () => ({
    pageNum: 0,
    pages: new Map<string, Page>(),
    curIndex: -1
  } as PageStore),
  actions: {
    getIndexPage(index: number | string): Page | undefined {
      return this.pages.get(String(index))
    },
    getPageNum() {
      return this.pageNum;
    },
    createPage(page = pageDefault as unknown as Pagedefault) {
      if (this.pages.get(page.zIndex)) { message.error('层级已存在'); return false; }
      if (this.pageNum > 7) { message.warning('最多只能创建7个层级'); return false }
      this.pageNum++;
      this.pages.set(String(this.pageNum), Object.assign(page, { id:this.pageNum, pageElements: [], zoom: 1, resizeHeight: page.height, resizeWidth: page.width }))
      this.curIndex =this.pageNum
      return true
    },
    setZoom(zoom: number) {
      let curPage = this.pages.get(String(this.curIndex))
      if (!curPage) { return message.error('请创建初始页面') }
      const calculateZoom = curPage.zoom + zoom
      if (calculateZoom < 0.1) { return message.warning('防缩比例不能小于0.1'); }
      curPage.zoom = Number(calculateZoom.toFixed(2))
      curPage.resizeWidth = ((Number(curPage.width) * calculateZoom).toFixed(0))
      curPage.resizeHeight = ((Number(curPage.height) * calculateZoom).toFixed(0))
    },
    deletePage(index: number | string) {
      this.pages.delete(String(index))
      this.pageNum--
      this.pageNum--;
    },
  }
})
export default usePageStore