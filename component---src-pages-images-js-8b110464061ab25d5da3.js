(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"ta+j":function(e,t,n){"use strict";n.r(t);var o=n("q1tI"),a=n.n(o),r=n("Sp1i"),i=n.n(r);function l(e){return e.join("\n")}i.a.config.update({region:"eu-central-1",credentials:new i.a.CognitoIdentityCredentials({IdentityPoolId:"eu-central-1:5786ef9b-b058-45e7-b698-aca2f1007fe9"})});var u=new i.a.S3({apiVersion:"2006-03-01",params:{Bucket:"user-story-creator"}});function p(e){var t=encodeURIComponent(e)+"/";u.listObjects({Prefix:t},(function(n,o){if(n)return alert("There was an error viewing your album: "+n.message);var a=this.request.httpRequest.endpoint.href+"user-story-creator/",r=o.Contents.map((function(n){var o=n.Key;return l(["<span>","<div>",'<img style="width:128px;height:128px;" src="'+(a+encodeURIComponent(o))+'"/>',"</div>","<div>","<span onclick=\"deletePhoto('"+e+"','"+o+"')\">","X","</span>","<span>",o.replace(t,""),"</span>","</div>","</span>"])})),i=r.length?"<p>Click on the X to delete the photo</p>":"<p>You do not have any photos in this album. Please add photos.</p>",u=["<h2>","Album: "+e,"</h2>",i,"<div>",l(r),"</div>",'<input id="photoupload" type="file" accept="image/*">','<button id="addphoto" onclick="addPhoto(\''+e+"')\">","Add Photo","</button>",'<button onclick="listAlbums()">',"Back To Albums","</button>"];document.getElementById("app").innerHTML=l(u)}))}t.default=function(){return a.a.useEffect((function(){p("test")})),a.a.createElement(a.a.Fragment,null,a.a.createElement("h1",null,"My Photo Albums App"),a.a.createElement("div",{id:"app"}),a.a.createElement("div",null),a.a.createElement("div",null,a.a.createElement("input",{id:"photoupload",type:"file",accept:"image/*"}),a.a.createElement("button",{id:"addphoto",onClick:function(){return function(e){var t=document.getElementById("photoupload").files;if(!t.length)return alert("Please choose a file to upload first.");var n=t[0],o=n.name,a=encodeURIComponent(e)+"/"+o;new i.a.S3.ManagedUpload({params:{Bucket:"user-story-creator",Key:a,Body:n,ACL:"public-read"}}).promise().then((function(t){alert("Successfully uploaded photo."),console.log(t),p(e)}),(function(e){return alert("There was an error uploading your photo: ",e.message)}))}("test")}},"Upload")))}}}]);
//# sourceMappingURL=component---src-pages-images-js-8b110464061ab25d5da3.js.map