const Mock = require('mockjs') // 获取mock对象
// const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写

// 随机生成文章数据
// 定义请求链接，类型，还有返回数据
// 获取每个课程每个学生的具体情况
Mock.mock(`${domain}/courseStuDatas`, 'get', {
  code: 200,
  'course|0-2': [{
    'c_id|+1': 2001,
    'c_name|+1': ["java", "c语言", "网站设计"],
    'times|1-2': [
      {
        'time|+1': ["周一 3-5", "周二 4-5", "周三 7-8", "周四 12-15", "周一 9-11"],
        'students|50-100': [
          {
            's_id|+1': 162011001,
            's_name': '@cname',
            'normal|1-18': 1,
            'late|0-5': 1,
            'truant|0-5': 1,
            'leave|0-5': 1,
            score: function () {
              return (100 - this.late * 2 - this.truant * 5)
            }
          }]
      }]
  }]
});


// 获取上课考勤总体情况，做图表用的
// 一个老师两门课，每门课有1-2个班，每门课每周可能1-2堂
//classes 老师可能会带几个班级
//每个班级都有id
Mock.mock(`${domain}/courseTotal/1.json`, 'get', {
  totalPages: 3,//总共分成3个请求
  code: 200,
  'classes|0-2': [
    // {  //顺序抽取哪堂课
    //   'class_id|+1': 20160101, //具体班级的id
    //   'course_name': 'java',
    //   'course_time|+1': [['周二8-10', '周四8-10'], ['周一 8-10', '周三 8-10 ']],
    //   'times|32-36': [  //该门课对应的周数，显示每一周的详细情况
    //     {
    //       'actualNum': -1,
    //       'late|0-5': 1,
    //       'truant|0-5': 1,
    //       'leave|0-5': 1,
    //     }
    //   ],
    //   'total|50-100': 1  //该门课总上课人数
    // },
    {
      'class_id|+1': 20160201, //具体班级的id
      'course_name': 'c语言',
      'course_time|+1': [['周二8-10'], ['周一 8-10']],
      'normalRatio': 90,
      'lateRatio': 6,
      'truantlRatio': 2,
      'leavelRatio': 2,
      'times|16-18': [  //该门课对应的周数，显示每一周的详细情况
        {
          'actualNum': -1,
          'late|0-5': 1,
          'truant|0-5': 1,
          'leave|0-5': 1,
        }
      ],
      'total|80-110': 1  //该门课总上课人数
    }
  ],
});

Mock.mock(`${domain}/courseTotal/2.json`, 'get', {
  totalPages: 3,//总共分成3个请求
  code: 200,
  'classes|2': [
    {  //顺序抽取哪堂课
      'class_id|+1': 20160101, //具体班级的id
      'course_name': 'java',
      'course_time|+1': [['周二8-10', '周四8-10'], ['周一 8-10', '周三 8-10 ']],
      'normalRatio': 89,
      'lateRatio': 7,
      'truantlRatio': 2,
      'leavelRatio': 2,
      'times|32-36': [  //该门课对应的周数，显示每一周的详细情况
        {
          'actualNum': -1,
          'late|0-5': 1,
          'truant|0-5': 1,
          'leave|0-5': 1,
        }
      ],
      'total|50-100': 1  //该门课总上课人数
    },
    {
      'class_id|+1': 20160201, //具体班级的id
      'course_name': 'c语言',
      'course_time|+1': [['周二8-10'], ['周一 8-10']],
      'normalRatio': 95,
      'lateRatio': 3,
      'truantlRatio': 2,
      'leavelRatio': 0,
      'times|16-18': [  //该门课对应的周数，显示每一周的详细情况
        {
          'actualNum': -1,
          'late|0-5': 1,
          'truant|0-5': 1,
          'leave|0-5': 1,
        }
      ],
      'total|80-110': 1  //该门课总上课人数
    }
  ],
});

Mock.mock(`${domain}/courseTotal/3.json`, 'get', {
  totalPages: 3, //总共分成3个请求
  code: 200,
  'classes|2': [
    {  //顺序抽取哪堂课
      'class_id|+1': 20160101, //具体班级的id
      'course_name': 'java',
      'course_time|+1': [['周二8-10', '周四8-10'], ['周一 8-10', '周三 8-10 ']],
      'normalRatio': 89,
      'lateRatio': 7,
      'truantlRatio': 2,
      'leavelRatio': 2,
      'times|32-36': [  //该门课对应的周数，显示每一周的详细情况
        {
          'actualNum': -1,
          'late|0-5': 1,
          'truant|0-5': 1,
          'leave|0-5': 1,
        }
      ],
      'total|50-100': 1  //该门课总上课人数
    },
    {
      'class_id|+1': 20160201, //具体班级的id
      'course_name': 'c语言',
      'course_time|+1': [['周二8-10'], ['周一 8-10']],
      'normalRatio': 70,
      'lateRatio': 15,
      'truantlRatio': 5,
      'leavelRatio': 5,
      'times|16-18': [  //该门课对应的周数，显示每一周的详细情况
        {
          'actualNum': -1,
          'late|0-5': 1,
          'truant|0-5': 1,
          'leave|0-5': 1,
        }
      ],
      'total|80-110': 1  //该门课总上课人数
    }
  ],
});


