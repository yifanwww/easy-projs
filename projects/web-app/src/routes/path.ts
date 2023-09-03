export const RoutePath = {
    HOME: '/',

    // -------------------- React Rerender Test --------------------

    RERENDER_TEST_HOME: '/react-render-test',
    RERENDER_TEST_CHANGE_LEVEL: '/react-rerender-test/change-level',
    RERENDER_TEST_CHANGE_PARENT: '/react-rerender-test/change-parent',
    RERENDER_TEST_NESTED_FC: '/react-rerender-test/nested-fc',
    RERENDER_TEST_RERENDER_PARENT: '/react-rerender-test/rerender-parent',
    RERENDER_TEST_ROUTE: '/react-rerender-test/router',
    RERENDER_TEST_ROUTE_DETAIL: '/react-rerender-test/router/:num',

    // -------------------- React Performance Test --------------------

    PERF_TEST_HOME: '/react-perf-test',
    PERF_TEST_BAR_CHART: '/react-perf-test/bar-chart',
    PERF_TEST_LINE_CHART: '/react-perf-test/line-chart',
    PERF_TEST_TEST: '/react-perf-test/test',
} as const;