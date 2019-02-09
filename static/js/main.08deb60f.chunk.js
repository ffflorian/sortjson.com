(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{3689:function(e,t,n){e.exports=n(3825)},3823:function(e,t,n){},3825:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(16),i=n.n(o),c=n(18),l=n(11),s=n(121),u=function(){return"undefined"!==typeof localStorage},p=r.a.createContext({switchTheme:function(){},theme:"light"}),m=function(e){var t=e.children,n=Object(a.useState)("dark"===(u()&&localStorage.getItem("theme"))?"dark":"light"),o=Object(s.a)(n,2),i=o[0],c=o[1];return r.a.createElement(p.Provider,{value:{switchTheme:function(){var e,t="dark"===i?"light":"dark";c(t),e=t,u()&&localStorage.setItem("theme",e)},theme:i}},t)},h=function(e){var t=e.children,n=Object(a.useContext)(p).theme;return r.a.createElement(c.MuiThemeProvider,{theme:Object(c.createMuiTheme)({palette:{type:n},typography:{useNextVariants:!0}})},r.a.createElement(l.c,null),t)},d=n(118),f=Object(c.withStyles)(function(){return Object(c.createStyles)({AppBarWrapper:{flexGrow:1},DarkModeControl:{userSelect:"none"},Title:{flexGrow:1,lineHeight:"48px",paddingLeft:"20px"}})})(function(e){var t=e.classes,n=Object(a.useContext)(p),o=n.theme,i=n.switchTheme,c="dark"===o;return r.a.createElement("div",{className:t.AppBarWrapper},r.a.createElement(l.a,{color:"default",position:"static"},r.a.createElement(l.d,null,r.a.createElement(l.f,{row:!0},r.a.createElement(l.l,{className:t.Title,color:"inherit",variant:"h5"},"Sort JSON"),r.a.createElement(l.e,{className:t.DarkModeControl,control:r.a.createElement(l.j,{color:"primary",checked:c,onChange:i}),label:"Dark Mode"}),r.a.createElement(l.h,{color:"inherit",href:"https://github.com/ffflorian/sortjson.com"},r.a.createElement(d.a,null))))))}),b=n(40),g=n(41),v=n(43),O=n(42),w=n(44),y=function(e){function t(e){return Object(b.a)(this,t),Object(v.a)(this,Object(O.a)(t).call(this,e))}return Object(w.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(l.l,{align:"left",className:e.Imprint,gutterBottom:!0},"Version ".concat("1.4.0"))}}]),t}(r.a.Component),E=Object(c.withStyles)(function(e){return Object(c.createStyles)({Imprint:{marginTop:"10px",paddingLeft:"20px"}})})(y),S=n(29),x=n.n(S),j=n(75),k=n(119),C=n.n(k),I=n(120),N=n.n(I),T=function(e){function t(e){var n;return Object(b.a)(this,t),(n=Object(v.a)(this,Object(O.a)(t).call(this,e))).formatJSON=function(){try{var e=C.a.parse(n.state.input),t=N.a.sortObj(e,!0);n.setState({output:JSON.stringify(t,null,2),outputInfo:"Formatted and sorted JSON result."})}catch(a){n.setState({output:"",outputInfo:"Input is not valid JSON."})}},n.handleInput=function(e){n.setState({input:e.currentTarget.value},n.formatJSON)},n.copyToClipboard=function(){var e=Object(j.a)(x.a.mark(function e(t){var a,r;return x.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a=navigator).permissions){e.next=6;break}return e.next=4,a.permissions.query({name:"clipboard-write"});case 4:"granted"!=(r=e.sent).state&&"prompt"!=r.state||(navigator.clipboard.writeText(n.state.output),n.setState({outputInfo:"Copied output into clipboard."}));case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n.pasteFromClipboard=function(){var e=Object(j.a)(x.a.mark(function e(t){var a,r,o;return x.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a=navigator).permissions){e.next=10;break}return e.next=4,a.permissions.query({name:"clipboard-read"});case 4:if("granted"!=(r=e.sent).state&&"prompt"!=r.state){e.next=10;break}return e.next=8,navigator.clipboard.readText();case 8:o=e.sent,n.setState({input:o,inputInfo:"Pasted clipboard content into input."},n.formatJSON);case 10:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n.state={input:JSON.stringify({name:"Sophie",age:50},null,2),inputInfo:"Please paste your unformatted JSON here.",output:"",outputInfo:""},n}return Object(w.a)(t,e),Object(g.a)(t,[{key:"componentDidMount",value:function(){this.formatJSON()}},{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(l.g,{container:!0},r.a.createElement(l.g,{item:!0,xs:12,sm:6},r.a.createElement(l.i,{className:e.Pane},r.a.createElement(l.l,{variant:"h5",component:"h3"},"Input"),r.a.createElement(l.k,{fullWidth:!0,helperText:this.state.inputInfo,id:"jsonInput",multiline:!0,onChange:this.handleInput,placeholder:this.state.input,rows:4,rowsMax:1/0,style:{margin:8},variant:"filled",InputLabelProps:{shrink:!0}}),this.hasClipboardSupport&&r.a.createElement(l.b,{className:e.Button,color:"inherit",onClick:this.pasteFromClipboard,variant:"contained"},"Paste"))),r.a.createElement(l.g,{item:!0,xs:12,sm:6},r.a.createElement(l.i,{className:e.Pane},r.a.createElement(l.l,{variant:"h5",component:"h3"},"Output"),r.a.createElement(l.k,{disabled:!0,fullWidth:!0,helperText:this.state.outputInfo,id:"jsonOutput",multiline:!0,rows:4,rowsMax:1/0,style:{margin:8},value:this.state.output,variant:"filled",InputLabelProps:{shrink:!0}}),this.hasClipboardSupport&&r.a.createElement(l.b,{className:e.Button,color:"inherit",onClick:this.copyToClipboard,variant:"contained"},"Copy"))))}},{key:"hasClipboardSupport",get:function(){var e="undefined"!==typeof navigator.clipboard,t=-1===navigator.userAgent.toLowerCase().indexOf("firefox");return e&&t}}]),t}(r.a.Component),J=Object(c.withStyles)(function(e){return Object(c.createStyles)({Button:{margin:e.spacing.unit},Pane:{margin:"20px",padding:2*e.spacing.unit}})})(T),P=function(){return r.a.createElement(m,null,r.a.createElement(h,null,r.a.createElement(f,null),r.a.createElement(J,null),r.a.createElement(E,null)))};n(3823),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[3689,2,1]]]);
//# sourceMappingURL=main.08deb60f.chunk.js.map