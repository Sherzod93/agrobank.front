(this.webpackJsonpundefined=this.webpackJsonpundefined||[]).push([[4,5],{342:function(t,e){},343:function(t,e){},350:function(t,e){},351:function(t,e){},389:function(t,e){},699:function(t,e,l){"use strict";l.r(e),l.d(e,"CalculationPdf",(function(){return s}));var c=l(13),n=l(434),a=l(1),i=l(11),o=l(4),A=l(55),r=l(0);n.Font.register({family:"ALS-Agrobank",fontWeight:400,src:"".concat("/f/dist","/calculator-pdf-fonts/ALSAgrofont-Regular.woff")}),n.Font.register({family:"ALS-Agrobank",fontWeight:"bold",src:"".concat("/f/dist","/calculator-pdf-fonts/ALSAgrofont-Bold.woff")});var b=n.StyleSheet.create({page:{fontFamily:"ALS-Agrobank",fontSize:14,padding:"1cm"},logo:{height:"auto",width:"4cm"},description:{fontSize:24,fontWeight:"bold",marginBottom:24,marginTop:24},param:{display:"flex",flexDirection:"row",fontSize:16,marginTop:10},paramTitle:{flexShrink:0,fontWeight:"bold",width:"7cm"},paramValue:{flexGrow:1,paddingLeft:10},tableHeader:{alignItems:"center",backgroundColor:"#b2ebc4",display:"flex",flexDirection:"column",fontWeight:"bold",marginTop:24},tableRow:{display:"flex",flexDirection:"row"},tableRowOdd:{backgroundColor:"#ecfaf0"},tableCell:{padding:"0.2cm",width:"25%"},tableCellAlignCenter:{textAlign:"center"},tableCellAlignRight:{textAlign:"right"},tableCellPosition:{width:"2cm"},disclaimer:{fontSize:10,marginTop:24}}),s=function(t){var e=t.calculationData,l=t.currencyCodeToCurrencyRecordMap,s=t.language,u=t.product,g=t.t,j=g("block-calculator.calculation-description_".concat(u.type),{title:u.title}),d=g("block-calculator.calculation-disclaimer_".concat(u.type),{title:u.title}),m=Object(a.useMemo)((function(){var t=[];return e.type===o.s.deposit&&t.push({title:g("block-calculator.amount"),type:"amount",value:e.amount},{title:g("block-calculator.monthCount"),type:"term",value:e.monthCount},{title:g("block-calculator.interestRate"),type:"interestRate",value:e.interestRate},{title:g("block-calculator.totalIncome"),type:"amount",value:e.totalIncome}),e.type===o.s.loan&&t.push({title:g("block-calculator.amount"),type:"amount",value:e.amount},{title:g("block-calculator.monthCount"),type:"term",value:e.monthCount},{title:g("block-calculator.interestRate"),type:"interestRate",value:e.interestRate}),t.push.apply(t,Object(c.a)(Object.values(e.customResultValues))),t}),[e,g]),p=Object(a.useMemo)((function(){var t;if(null===(t=e.records)||void 0===t?void 0:t.length){if(e.type===o.s.deposit)return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)(n.View,{style:Object.assign({},b.tableHeader,b.tableRow),children:[Object(r.jsx)(n.Text,{style:Object.assign({},b.tableCell,b.tableCellPosition,b.tableCellAlignCenter),children:Object(i.l)(g("block-calculator.number-sign"))}),Object(r.jsx)(n.Text,{style:Object.assign({},b.tableCell,b.tableCellAlignRight),children:Object(i.l)(g("block-calculator.monthlyIncome"))})]}),e.records.slice(1).map((function(t,e){var c=t.income;return Object(r.jsxs)(n.View,{style:Object.assign({},b.tableRow,e%2===1?b.tableRowOdd:null),children:[Object(r.jsx)(n.Text,{style:Object.assign({},b.tableCell,b.tableCellPosition,b.tableCellAlignCenter),children:Object(i.l)(String(e+1))}),Object(r.jsx)(n.Text,{style:Object.assign({},b.tableCell,b.tableCellAlignRight),children:Object(i.l)(Object(A.b)({type:"amount",value:c},g,s,void 0,l))})]},e)}))]});if(e.type===o.s.loan)return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)(n.View,{style:Object.assign({},b.tableHeader,b.tableRow),children:[Object(r.jsx)(n.Text,{style:Object.assign({},b.tableCell,b.tableCellPosition,b.tableCellAlignCenter),children:Object(i.l)(g("block-calculator.number-sign"))}),Object(r.jsx)(n.Text,{style:Object.assign({},b.tableCell,b.tableCellAlignRight),children:Object(i.l)(g("block-calculator.monthlyPayment"))}),Object(r.jsx)(n.Text,{style:Object.assign({},b.tableCell,b.tableCellAlignRight),children:Object(i.l)(g("block-calculator.monthlyBody"))}),Object(r.jsx)(n.Text,{style:Object.assign({},b.tableCell,b.tableCellAlignRight),children:Object(i.l)(g("block-calculator.monthlyInterest"))}),Object(r.jsx)(n.Text,{style:Object.assign({},b.tableCell,b.tableCellAlignRight),children:Object(i.l)(g("block-calculator.monthlyAmount"))})]}),e.records.slice(1).map((function(t,e){var c=t.amount,a=t.body,o=t.interest,u=t.payment;return Object(r.jsxs)(n.View,{style:Object.assign({},b.tableRow,e%2===1?b.tableRowOdd:null),children:[Object(r.jsx)(n.Text,{style:Object.assign({},b.tableCell,b.tableCellPosition,b.tableCellAlignCenter),children:Object(i.l)(String(e+1))}),[u,a,o,-c].map((function(t,e){return Object(r.jsx)(n.Text,{style:Object.assign(b.tableCell,b.tableCellAlignRight),children:Object(i.l)(Object(A.b)({type:"amount",value:t},g,s,void 0,l))},e)}))]},e)}))]})}return null}),[e,l,s,g]),O=u.calculationParams.monthCount.rates;return Object(r.jsx)(n.Document,{children:Object(r.jsxs)(n.Page,{size:"A4",style:b.page,children:[Object(r.jsx)(n.View,{children:Object(r.jsx)(n.Image,{style:b.logo,src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANsAAAArCAMAAADGzw1rAAAAdVBMVEUAAAAAz3AAAAAAz2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzWoAAAAAAAAAAAAAAAAAy2oAAAAAAAAAzGgAAAAAzGgAAAAAzGkAAAAAAAAAAAAAAAAAAAAAy2kAAAAAzGkAAAAAAAAAAAAAAAAAAAAAzGkAAABhqigeAAAAJXRSTlMAEBAgIDA/QE9QX2Bgb3B/gICPkJCfn6Cgr7C/wM/P0NDf4O/wnEmWTgAABA5JREFUeNrd2m13myAYBuBnDGJdrc7OpsY4F9/4/z9xIN4iNRxtes6SeX/iICJXQDRtqL+S9+drtT/pf8s1GtHzTm1/vpHC7dKmaRq3Q5umGdzubJoG3M5shgbcrmygAbcjG2gWtxubpVncP7UFiUpAt4UnKpFr89OA89vE2Sb9ui2VKrf2E0iV0rX5aMB5begPYQ9rA82HW7fFj2oDzYPz2ESpAlv9oDbQvDjYluESCR7SBpof57dlUuUiVXJ3Tg8HTjbuIYbiQWVhY6hEuG7GaBlUe2ygreC8tlZK2ZnJm1mSWqpUIY1XxJ0piB+nyQlOpvIUzG18qG1fp0EfWzmk+kE60iRTPZmzxUdbZI4TaCs4ry0yM1Y4y4lVckz8wRaxFi3ZUU45sclWtLh/zZhzaXNm1lYKNGyFa+P6QKOagraSXz7bWaoIQ6xtpY1rywsJm/LbVAw2m3oAl3KO0zaQbEPXdsbND9pa3mG7spM0qtDpQoi51OnKtJxsPE3TYRgStmxsVHZm5qytQV0+2spcnd1gv0JZNYQ7nNviaQmBto5b2rBiYhQKVcCMXLgqsXx2h48DygKVcXstGEEZjLYu0OcVutgybcs5DSlGLubyIgYIJLCJ4RjpfKeteaZlWIs9REiUxmELgFxbzmhIjCFgqJnzDGDTOjDtcYXSnhDYorWZD7YzF/+9dd7ers1bZK/X4CK4ynUbETx2DYe6XDk2ymblpyQ5Jcnhqi21tsUrUr8R99YvbFh9rwedo7mrMdRixVbZ4RGTOq4tmspJK5GtNjbagLtlnxQSQcKt89bMH4iuzc5ljsfJJ20n2IC74fmWL2xnXKX229zh4SPq5jaUsXfqjbLYYGtS0z6EDbjt7yV2J1mEAxGZJj5bPgx55ihcWz32UVvGBls5VrQMNuA++z4ZmScU0kmVDLt1+6J3geq6DUsocorp9O5BCT4oexLbZqPLtCp74G74HlCj39lUtLOlj9eTpQ3jk6eXl6PUaTBO2b4+vZzMebgvE1UQlS5V6zYxbZU9cJ/9/gYCJ0RMU5FKpPPaRCcRPJFwGiKs94wtpS5XbLYb2Cxu+/fuHI9fpMFuQrE0aYTP5uK6YBrU0KtdsOwytTGldRtdYPPiQPPZGAYwJbYTybNSdmXMuN9GLIMu53acQWRqm3BsNWIvQnQbbQI2Hw40vy3QYYsa7nlxoUDH7SJMVUL0wU2HLM6KVMkQHqtGQjeP0jTSjcXQ0J7DcXHdCscDa7O4r/998pU5X+Riuk96Dw60m2yyPT4xJftRY5XeJb0HB9ptNicZ3Sm9Bwfa12053Su9BwfaTbaokUgT0d3Se3Bf/L+pSPNSJQ3pjukXuP3+v1vh9vs7hb5/2+/vSxRuH78L+gsMIXS/8XTGdwAAAABJRU5ErkJggg=="})}),j?Object(r.jsx)(n.View,{style:b.description,children:Object(r.jsx)(n.Text,{children:Object(i.l)(j)})}):null,m.map((function(t,e){return Object(r.jsxs)(n.View,{style:b.param,children:[Object(r.jsx)(n.Text,{style:b.paramTitle,children:Object(i.l)(t.title)}),Object(r.jsx)(n.Text,{style:b.paramValue,children:Object(i.l)(Object(A.b)(t,g,s,u.currency,l,O))})]},e)})),p,d?Object(r.jsx)(n.View,{style:b.disclaimer,children:Object(r.jsx)(n.Text,{children:Object(i.l)(d)})}):null]})})}}}]);