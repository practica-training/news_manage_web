<script>
    //东莞理工学院网络空间安全学院接口
    //host
    const DgutCMSHost = "https://css.dgut.edu.cn";

    //获得所有栏目
    const DgutGetAllColumns = {
        url: DgutCMSHost + "/api/columns/",
        type: "get",
        params: "",
    };

    //获得搜索结果
    const DgutGetSearch = {
        url: DgutCMSHost + "/api/article/search",
        type: "get",
        params: "keyword",
    };

    //获得主页其他配置
    const DgutGetWebsiteConfig = {
        url: DgutCMSHost + "/api/website/config",
        type: "get",
        params: "",
    };

    //获得轮播图
    const DgutGetCarouselList = {
        url: DgutCMSHost + "/api/website/homeImage",
        type: "get",
        params: "",
    };

    //获得新闻列表
    const DgutGetNewsList = {
        url: DgutCMSHost + "/api/article/list/news",
        type: "get",
        params: "",
    };

    //获得指定新闻列表
    const DgutGetNewsListByColumns = {
        url: DgutCMSHost + "/api/article/list/$columns",
        type: "get",
        params: "columns",
    };

    //获得公告列表
    const DgutGetNoticeList = {
        url: DgutCMSHost + "/api/article/list/notice",
        type: "get",
        params: "",
    };

    //获得文章详细内容
    const DgutGetArticleInfo = {
        url: DgutCMSHost + "/api/article/$articleId",
        type: "get",
        params: "articleId",
    };

    //通过栏目编号获得教师列表
    const DgutGetTeacherListByBranch = {
        url: DgutCMSHost + "/api/teacher/$branch",
        type: "get",
        params: "branch",
    };


    //获取教师详细信息
    const DgutGetTeacherInfo = {
        url: DgutCMSHost + "/api/teacher/$teacherId/info",
        type: "get",
        params: "teacherId",
    };

    const NewsType = [{
        "id": "8abef8d06f59e83e016f59e85bb70000",
        "name": "财经"
    }, {"id": "8abef8d06f59e83e016f59e85c6e0001", "name": "科技"}, {
        "id": "8abef8d06f59e83e016f59e85cdc0002",
        "name": "健康"
    }, {"id": "8abef8d06f59e83e016f59e85d490003", "name": "体育"}, {
        "id": "8abef8d06f59e83e016f59e85db80004",
        "name": "教育"
    }, {"id": "8abef8d06f59e83e016f59e85e250005", "name": "文化"}, {
        "id": "8abef8d06f59e83e016f59e85e960006",
        "name": "军事"
    }, {"id": "8abef8d06f59e83e016f59e85f060007", "name": "娱乐"}, {
        "id": "8abef8d06f59e83e016f59e85f740008",
        "name": "时尚"
    }];

    export default {
        DgutCMSHost,
        DgutGetAllColumns,
        DgutGetSearch,
        DgutGetWebsiteConfig,
        DgutGetCarouselList,
        DgutGetNewsList,
        DgutGetNewsListByColumns,
        DgutGetNoticeList,
        DgutGetArticleInfo,
        DgutGetTeacherListByBranch,
        DgutGetTeacherInfo,
        NewsType
    };
</script>
