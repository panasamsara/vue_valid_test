"use strict";

const notNull = (rule, value, callback) => {
  if (value.toString().trim().length==0) {
      callback(new Error("不能为空！"));
  } else {
      callback();
  }
}
// 非全角
const fullAngleBack = (rule, value, callback) => {
  if (/[\uFF00-\uFFFF]/g.test(value)) {
    callback(new Error("不能输入全角字符！"));
  } else {
    callback();
  }
}
const arrayValite = (rule, value, callback) => {
  if (value.length === 0) {
    callback(new Error("不能为空！"));
  } else {
    callback();
  }
}
const vdLengthNew = (rule,value,callback)=> {
  //传入字符串，返回字符串的长度
  let len = 0;
  if(value){
      for (let char of value) {
      len += char.match(/[^\x00-\xff]/ig) != null ? 2 : 1;
      }
  }
  if(len > rule.max) {
      //  callback(new Error(`不能大于${rule.max/2}位汉字或${rule.max}位字符！`));
      callback(new Error(`不能大于${rule.max}位字符！`));
  }else {
      callback()
  }
}
// 数字限制大小
const numSize = (rule, value, callback) => {
  if (parseInt(value) > 1000000000) {
    callback(new Error("不能大于10000000！"));
  } else {
    callback();
  }
}
// 正数 >0
const positiveNumber = (rule, value, callback)=> {
  if (parseFloat(value) > 0) {
    callback();
  }else{
    callback(new Error("请输入正数"))
  }
}
const numPercent = (rule, value, callback) => {
  if (parseFloat(value) > 100) {
    callback(new Error("不能大于100！"));
  } else if (parseFloat(value) < 0) {
    callback(new Error("不能小于0！"));
  } else {
    callback();
  }
}


const validate = {
vdRequired: () => {
  return [{
      required: true,
      message: "不能为空！",
      trigger: ["blur",'change'],
    },
  ];
},
vdRequiredNotNull: (required) => {
  return [{
      required: required,
      message: "不能为空！",
      trigger: ["blur"],
    },
    {
      validator: notNull,
      trigger: "blur",
    },
  ];
},
vdArrayRequired: () => {
  return [{
    required: true,
    validator: arrayValite,
    message: "不能为空！",
    trigger: "change",
  }, ];
},
vdLength: (max, required) => {
  let arr = [{
      required: required,
      message: "不能为空！",
      trigger: "blur",
    },
    {
      max:max,
      validator: vdLengthNew,
      trigger: "blur",
    }
  ];
  return arr
},
onlyLength: (max) => {
  return [
    {
      max: max,
      message: `不能大于${max}位字符！`,
      trigger: "blur",
    },
  ];
},
// 单选框,多选框，下拉框限制
vdRadio: (required) => {
  return [{
      required: required,
      message: "请选择",
      trigger: "change"
    },
  ];
},
// 时间限制
vdTime: (required) => {
  return [{
      type: "date",
      required: required,
      message: "请选择日期",
      trigger: "change",
    },
  ];
},
// 金额 可以负数 6位小数 （万元）
vdJineWanYuan: (required) => {
  return [{
      required: required,
      message: "不能为空！",
      trigger: "blur",
    },
    {
      pattern: /^\-?\d[0-9.]*$/,
      message: "必须为数字",
      trigger: "blur",
    },
    {
      validator: numSize,
      trigger: "blur",
    },
    {
      pattern: /^\-?[0-9]+[.]?[0-9]{0,6}$/,
      message: `输入最多6位小数`,
      trigger: "blur"
    }
  ];
},
// 金额 2位小数 (元)
vdJineYuan: (required) => {
  return [{
      required: required,
      message: "不能为空！",
      trigger: "blur",
    },
    {
      pattern: /^[0-9.]*$/,
      message: "必须为数字",
      trigger: "blur",
    },
    {
      validator: numSize,
      trigger: "blur",
    },
    {
      pattern: /^[0-9]+[.]?[0-9]{0,2}$/,
      message: `输入最多2位小数`,
      trigger: "blur"
    }
  ];
},
vdTel: (required) => {
  return [{
      required: required,
      message: "不能为空！",
      trigger: "blur",
    },
    {
      pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
      message: "请输入正确手机号！",
      trigger: "blur",
    },
  ];
},
vdTelGd: (required) => {
  return [{
      required: required,
      message: "不能为空！",
      trigger: "blur",
    },
    {
      pattern: /([0-9]{3,4}-)?[0-9]{7,8}/,
      message: "请输入正确固话！",
      trigger: "blur",
    },
  ];
},
vdTelAll: (required) => {
  return [{
      required: required,
      message: "不能为空！",
      trigger: "blur",
    },
    {
      pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$|^([0-9]{3,4}-)?[0-9]{7,8}$/,
      message: "请输入正确的电话号码！",
      trigger: "blur",
    },
  ];
},
vdDateRange: (required) => {
  return [{
    required: required,
    message: "不能为空！",
    trigger: "change"
  }]
},
vdEmail: (required) => {
  return [{
      required: required,
      message: "不能为空！",
      trigger: "blur",
    },
    {
      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      message: "请输入正确邮箱！",
      trigger: "blur",
    },
  ];
},
vdPassword: (required) => {
  return [{
      required: required,
      message: "不能为空！",
      trigger: "blur",
    },
    {
      pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{6,16}$/,
      message: "密码需为6-16位字母和数字的组合",
      trigger: "blur",
    },
  ];
},
twoCeNum: (required) => {
  return [{
    pattern: /^[0-9]+[.]?[0-9]{0,2}$/,
    message: "输入最多两位小数",
    trigger: "blur",
    required: required,
  }]
},
// 百分数的限制
percentLimit: (required, type) => {
  if (type == 1) {
    return [{
        required: required,
        message: "不能为空！",
        trigger: "blur",
      },
      {
        pattern: /^[0-9.]*$/,
        message: "必须为数字",
        trigger: "blur",
      },
      {
        pattern: /^[0-9]+[.]?[0-9]{0,2}$/,
        message: `输入最多2位小数`,
        trigger: "blur"
      }
    ];
  } else {
    return [{
        pattern: /^[0-9]+[.]?[0-9]{0,2}$/,
        message: "输入最多两位小数",
        trigger: "blur",
      },
      {
        validator: numPercent,
        trigger: "blur",
      },
      {
        required: required,
        message: "不能为空！",
        trigger: "blur",
      }
    ]
  }
},
vdNumber: (required) => {
  return [{
      required: required,
      message: "不能为空！",
      trigger: "blur",
    },
    {
      pattern: /^[0-9]*$/,
      message: "请输入正整数",
      trigger: "blur",
    },
  ];
},
vdNumber6: (required) => {
  return [{
      required: required,
      message: '不能为空！',
      trigger: 'blur',
    },
    {
      pattern: /^[0-9]{6}$/,
      message: '需为6位数字',
      trigger: 'blur',
    },
  ]
},
vdNumberDecimal: (required) => {
  return [{
      required: required,
      message: "不能为空！",
      trigger: "blur",
    },
    {
      pattern: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
      message: "请输入正数",
      trigger: "blur",
    },
  ];
},
vdNumberZero: (required) => {
  return [{
      required: required,
      message: "不能为空！",
      trigger: "blur",
    },
    {
      pattern: /^[1-9]\d*$/,
      message: "请输入大于0的正整数",
      trigger: "blur",
    },
  ];
},
vdPNumber: (required) => {
  return [
    {
      required: required,
      message: "不能为空！",
      trigger: "blur",
    },
    {
      validator: positiveNumber,
      trigger: "blur",
    },
    {
      pattern: /^[0-9]{0,20}[.]?[0-9]{0,6}$/,
      message: '填写错误，请输入数字',
      trigger: 'blur',
    }
  ]
},
//100以内正整数
onehandrud: (required) => {
  return [{
      required: required,
      message: '不能为空！',
      trigger: 'blur',
    },
    {
      pattern: /^([0-9]{1,2}|100)$/,
      message: '必须输入100以内正整数',
      trigger: 'blur',
    }
  ]
},

//注册登录账号验证
vdZcZhangHao: (required) => {
  return [{
      required: required,
      message: '用户名不能为空！',
      trigger: 'blur',
    },
    {
      pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{8,16}$/,
      message: '8-16位字母和数字的组合',
      trigger: 'blur',
    },
  ]
},
//注册登录密码验证
vdZcPassWord: (required) => {
  return [{
      required: required,
      message: '登录密码不能为空！',
      trigger: 'blur',
    },
    {
      validator: fullAngleBack,
      trigger: 'blur',
    },
    {
      pattern: /((^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[\da-zA-Z\W]{8,20}$)|(^(?=.*\d)(?=.*[A-Z])(?=.*\W)[\da-zA-Z\W]{8,20}$)|(^(?=.*\d)(?=.*[a-z])(?=.*\W)[\da-zA-Z\W]{8,20}$)|(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\da-zA-Z\W]{8,20}$))/,
      message: '8-20位字符,至少包含大写字母、小写字母、数字、特殊字符中的三种',
      trigger: 'blur',
    },
  ]
},
//身份证号验证
peopleID: (required) => {
  return [{
      required: required,
      message: '请输入身份证号码',
      trigger: 'blur',
    },
    {
      pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      message: '身份证格式错误',
      trigger: 'blur',
    },
  ]
},
//企业社会信用代码验证
qyshxydmJy: (required) => {
  return [{
      required: required,
      message: '请输入正确的社会信用代码！',
      trigger: 'blur',
    },
    {
      pattern: /^(?![0-9]+$)(?![A-Z]+$)[0-9A-Z]{18,18}$/,
      message: '18位字母和数字的组合',
      trigger: 'blur',
    }
  ]
},

textArea: (max, required) => {
  return [{
      required: required,
      message: "不能为空！",
      trigger: "blur",
    },
    {
      max: max,
      message: `不能大于${max/2}位汉字或${max}位字符！`,
      trigger: "blur",
    },
  ];
},
notZero: (rule, value, callback) => {
  if (parseFloat(value) == 0) {
    callback(new Error("输入错误"));
  } else {
    callback();
  }
},
//注册登录账号验证
vdWordNumber: (required) => {
  return [{
      required: required,
      message: '不能为空！',
      trigger: 'blur',
    },
    {
      pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{8,16}$/,
      message: '8-16位字母和数字的组合',
      trigger: 'blur',
    },
  ]
},
};
export default validate;