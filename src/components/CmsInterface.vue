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

    //栏目
    const DgutColumns = {
        index: "1", //首页
        schoolInfo: { //学校概况
            cid: "5",
            introduction: "7", //学院介绍
            Institution: "8", //学院机构
            setting: "45", //系部设置
            profession: "48", //专业介绍
            dynamic: "62", //学院动态
        },
        communist: { //党建工会
            cid: "10",
            thinking: "11", //党建思政
            work: "12", //工会工作
        },
        teacher: { //师资力量
            cid: "13",
            network: "43", //网络工程系
            software: "14", //软件工程系
            networkSpace: "15", //网络空间安全系
            office: "46", //办公室
            laboratory: "47", //实验室
        },
        teaching: { //教学工作
            cid: "16",
            dynamic: "17", //教学动态
            certification: "18", //工程认证
            outline: "19", //教学大纲
            practice: "20", //企业实习
            competition: "21", //学科竞赛
            communication: "22", //交流项目
            research: "23", //教研工作
            scheme: "63", //人才培养方案
        },
        science: { //科学研究
            cid: "24",
            communication: "25", //学术交流
            dynamic: "26", //科研平台与动态
            result: "27", //科研项目与成果
            team: "28", //科研团队
        },
        environment: { //实验环境
            cid: "29",
            laboratory: "30", //实验室
            teaching: "31", //教学平台
            resources: "32", //教学资源
        },
        student: { //学生工作
            cid: "33",
            activitie: "34", //学生活动
            transaction: "35", //学生事务
            psychological: "36", //心理健康
        },
        employment: { //招生就业
            cid: "38",
            undergraduate: "39", //本科生招生
            graduate: "40", //研究生招生
            information: "49", //就业信息
            practice: "64", //实习信息
        },
        contact: { //校友联系
            cid: "51",
            organization: "52", //校友会组织
            activitie: "54", //校友活动
            style: "55", //校友风采
        },
        download: { //下载专区
            cid: "61",
            teacher: "42", //教师下载专区
            student: "50", //学生下载专区
        }
    };

    const OtherLinkList = [
        {
            title: "学习资源",
            data: [
                {
                    title: "优学院教学云平台",
                    url: "https://dgut.ulearning.cn/organization/index.html#/index/portal",
                    src: require('../assets/images/ulearning.png'),
                },
                {
                    title: "东莞理工学院网络教学平台",
                    url: "http://dglgxy.fanya.chaoxing.com/portal",
                    src: require('../assets/images/dgutlogo2.png'),
                },
                {
                    title: "超星尔雅课程",
                    url: "http://i.mooc.chaoxing.com/space/index.shtml",
                    src: require('../assets/images/chaoxingerya.png'),
                }
            ]
        },
        {
            title: "教学管理系统",
            data: [
                {
                    title: "教学档案系统(AR)",
                    url: "https://ar.css.dgut.edu.cn",
                    src: require('../assets/images/document.png'),
                },
                {
                    title: "在线编程系统OJ",
                    url: "https://oj.css.dgut.edu.cn",
                    src: require('../assets/images/code.png'),
                },
                {
                    title: "作业管理系统",
                    url: " https://hw.css.dgut.edu.cn",
                    src: require('../assets/images/homework.png'),
                },
                {
                    title: "实验报告管理系统",
                    url: " https://sy.css.dgut.edu.cn",
                    src: require('../assets/images/report.png'),
                },
                {
                    title: "实验室管理系统",
                    url: "https://lab.css.dgut.edu.cn",
                    src: require('../assets/images/lab.png'),
                },
                {
                    title: "毕设管理系统",
                    url: "http://dgut.co.cnki.net",
                    src: require('../assets/images/design.png'),
                },
                {
                    title: "实习管理系统",
                    url: "https://shixi.css.dgut.edu.cn",
                    src: require('../assets/images/internship.png'),
                },
                {
                    title: "实训管理系统",
                    url: "https://shixun.css.dgut.edu.cn",
                    src: require('../assets/images/manage.png'),
                }

            ]
        },
    ];

    const SchoolLinkList = [
        {
            title: "校内行政机构",
            data: [
                {
                    title: "纪委办公室、监察处",
                    url: "http://jcc.dgut.edu.cn/",
                    src: require('../assets/images/organization.png'),
                },
                {
                    title: "党委组织部",
                    url: "http://zzb.dgut.edu.cn/index2.asp",
                    src: require('../assets/images/organization2.png'),
                },
                {
                    title: "党委教师工作部",
                    url: "http://jsfz.dgut.edu.cn/",
                    src: require('../assets/images/organization.png'),
                },
                {
                    title: "学生工作部",
                    url: "http://xsc.dgut.edu.cn/",
                    src: require('../assets/images/organization2.png'),
                },
                {
                    title: "发展规划处",
                    url: "http://fzgh.dgut.edu.cn/",
                    src: require('../assets/images/organization.png'),
                },
                {
                    title: "教务处",
                    url: "http://jwc.dgut.edu.cn/",
                    src: require('../assets/images/organization2.png'),
                },
                {
                    title: "研究生处",
                    url: "http://yjs.dgut.edu.cn/",
                    src: require('../assets/images/organization.png'),
                },
                {
                    title: "科学技术处、社会科学处",
                    url: "http://scitech.dgut.edu.cn/business/website/mainPageIndex.do",
                    src: require('../assets/images/organization2.png'),
                },
                {
                    title: "人力资源处",
                    url: "http://www.dgut.edu.cn/dgut/rsc/rsc_index.shtml",
                    src: require('../assets/images/organization.png'),
                },
                {
                    title: "国际合作与交流处",
                    url: "http://gjc.dgut.edu.cn/",
                    src: require('../assets/images/organization2.png'),
                },
                {
                    title: "财务处",
                    url: "http://www.dgut.edu.cn/dgut/cwc/cwc_index.shtml",
                    src: require('../assets/images/organization.png'),
                },
                {
                    title: "审计处",
                    url: "http://sjc.dgut.edu.cn/",
                    src: require('../assets/images/organization2.png'),
                },
                {
                    title: "资产与实验室管理处",
                    url: "http://zsgl.dgut.edu.cn/",
                    src: require('../assets/images/organization.png'),
                },
                {
                    title: "资产与实验室管理处",
                    url: "http://zsgl.dgut.edu.cn/",
                    src: require('../assets/images/organization2.png'),
                },
                {
                    title: "安全保卫处（武装部）",
                    url: "http://bwc.dgut.edu.cn/",
                    src: require('../assets/images/organization.png'),
                },
                {
                    title: "工会",
                    url: "http://gh.dgut.edu.cn/",
                    src: require('../assets/images/organization2.png'),
                },
                {
                    title: "团委",
                    url: "https://tw.dgut.edu.cn/index.html",
                    src: require('../assets/images/organization.png'),
                }
            ]
        },
        {
            title: "校内教学机构",
            data: [

                {
                    title: "学生社区知行学院",
                    url: "http://zx.dgut.edu.cn",
                    src: require('../assets/images/home.png'),
                },
                {
                    title: "继续教育学院",
                    url: "http://cjy.dgut.edu.cn/",
                    src: require('../assets/images/home2.png'),
                },
                {
                    title: "马克思主义学院",
                    url: "http://mksxy.dgut.edu.cn",
                    src: require('../assets/images/home.png'),
                },
                {
                    title: "中法联合学院",
                    url: "http://dci.dgut.edu.cn/",
                    src: require('../assets/images/home2.png'),
                },
                {
                    title: "化学工程与能源技术学院",
                    url: "http://hxyny.dgut.edu.cn/",
                    src: require('../assets/images/home.png'),
                },
                {
                    title: "教育学院（师范学院）",
                    url: "http://sf.dgut.edu.cn/",
                    src: require('../assets/images/home2.png'),
                },
                {
                    title: "法律与社会工作学院（知识产权学院）",
                    url: "http://zfx.dgut.edu.cn",
                    src: require('../assets/images/home.png'),
                },

                {
                    title: "文学与传媒学院",
                    url: "http://wch.dgut.edu.cn/",
                    src: require('../assets/images/home2.png'),
                },
                {
                    title: "经济与管理学院",
                    url: "http://jgy.dgut.edu.cn",
                    src: require('../assets/images/home.png'),
                },
                {
                    title: "机械工程学院",
                    url: "http://jxx.dgut.edu.cn/",
                    src: require('../assets/images/home2.png'),
                },
                {
                    title: "生态环境与建筑工程学院",
                    url: "http://hshx.dgut.edu.cn/sthj/index.html",
                    src: require('../assets/images/home.png'),
                },
                {
                    title: "电子工程与智能化学院",
                    url: "http://ee.dgut.edu.cn/",
                    src: require('../assets/images/home2.png'),
                },
                {
                    title: "计算机科学与技术学院",
                    url: "http://cs.dgut.edu.cn",
                    src: require('../assets/images/home.png'),
                },
                {
                    title: "国际学院",
                    url: "http://gjxy.dgut.edu.cn",
                    src: require('../assets/images/home2.png'),
                },
                {
                    title: "粤台产业科技学院",
                    url: "http://yt.dgut.edu.cn/",
                    src: require('../assets/images/home.png'),
                },
                {
                    title: "材料科学与工程学院",
                    url: "http://clxy.dgut.edu.cn/",
                    src: require('../assets/images/home2.png'),
                }
            ]
        }
    ];

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
        DgutColumns,
        OtherLinkList,
        SchoolLinkList
    };
</script>