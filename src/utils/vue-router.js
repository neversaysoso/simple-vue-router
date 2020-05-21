class HistoryRoute {
  constructor() {
    this.current = null
  }
}

class VueRouter {
  constructor(options) {
    this.mode = options.mode || 'hash'
    this.routes = options.routes || []
    this.routesMap = this.createMap(this.routes)

    this.history = new HistoryRoute
    this.init()
  }

  init() {
    // 只考虑hash和history两种情况
    if (this.mode === 'hash') {
      location.hash ? '' : location.hash = '/'
      window.addEventListener('load', () => {
        this.history.current = location.hash.slice(1)
      })
      window.addEventListener('hashchange', () => {
        this.history.current = location.hash.slice(1)
      })
    } else {
      location.pathname ? '' : location.pathname = '/'
      window.addEventListener('load', () => {
        this.history.current = location.pathname
      })
      window.addEventListener('popstate', () => {
        this.history.current = location.pathname
      })
    }
  }

  createMap(routes) {
    return routes.reduce((prev, next) => {
      prev[next.path] = next.component
      return prev
    }, {})
  }

  back() {
    history.go('-1')
  }

  push(path) {
    const _path = path || '/'
    if (this.mode === 'hash') {
      location.href = `#${_path}`
    } else {
      window.history.pushState(_path, null, _path)
      this.history.current = _path
    }
  }
}

VueRouter.install = function (Vue) {
  // 混合注入$router和$route
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.router) {
        // 存在router属性 则为根组件
        this._root = this
        this._router = this.$options.router
        Vue.util.defineReactive(this, '_history', this._router.history)
      } else {
        // 逐级向上传
        this._root = this.$parent._root
      }
      Object.defineProperty(this, '$router', {
        get() {
          return this._root._router
        }
      })
      Object.defineProperty(this, '$route', {
        get() {
          return {
            current: this._root._router.history.current
          }
        }
      })
    }
  })
  Vue.component('router-link', {
    props: {
      to: String,
      tag: String
    },
    methods: {
      handleOnClick() {
        this._self._root._router.push(this.to)
      }
    },
    render() {
      let tag = this.tag || 'a'
      return <tag style="color: blue" on-click={this.handleOnClick}>{this.$slots.default}</tag>
    }
  })
  Vue.component('router-view', {
    render(h) {
      let current = this._self._root._router.history.current
      let routeMap = this._self._root._router.routesMap
      return h(routeMap[current])
    }
  })
}

export default VueRouter