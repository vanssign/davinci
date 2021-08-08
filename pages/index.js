import Head from 'next/head'
import Link from 'next/link';

import { useState, useEffect } from 'react';
import Editor from '../components/Editor';

export default function TestPage() {
  const temp=JSON.parse(`[
    {
        "tag": "h1",
        "content": "Welcome to Davinci Editor",
        "classes": "",
        "typography": {
            "bold": false,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        "textColor": "dark",
        "alignment": "left",
        "alignSelf": "center",
        "bgColor": "transparent",
        "col": 12,
        "colMd": 12,
        "colLg": 12
    },
    {
        "tag": "p",
        "content": "A WYSIWYG Editor",
        "classes": "",
        "typography": {
            "bold": false,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        "textColor": "success",
        "alignment": "center",
        "alignSelf": "center",
        "bgColor": "transparent",
        "col": 12,
        "colMd": 6,
        "colLg": 3,
        "whiteSpace": "normal"
    },
    {
        "tag": "p",
        "content": "Interactive Interface",
        "classes": "",
        "typography": {
            "bold": false,
            "italic": true,
            "underline": false,
            "strikethrough": false
        },
        "textColor": "dark",
        "alignment": "center",
        "alignSelf": "center",
        "bgColor": "light",
        "col": 12,
        "colMd": 6,
        "colLg": 3,
        "whiteSpace": "normal"
    },
    {
        "tag": "p",
        "content": "Easy Formatting",
        "classes": "",
        "typography": {
            "bold": false,
            "italic": false,
            "underline": true,
            "strikethrough": false
        },
        "textColor": "white",
        "alignment": "center",
        "alignSelf": "center",
        "bgColor": "info",
        "col": 12,
        "colMd": 6,
        "colLg": 3,
        "whiteSpace": "normal"
    },
    {
        "tag": "p",
        "content": "Responsive Design",
        "classes": "",
        "typography": {
            "bold": true,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        "textColor": "dark",
        "alignment": "center",
        "alignSelf": "center",
        "bgColor": "transparent",
        "col": 12,
        "colMd": 6,
        "colLg": 3,
        "whiteSpace": "normal"
    },
    {
        "tag": "p",
        "content": "Add Images , upload them and change their responsive nature",
        "classes": "",
        "typography": {
            "bold": false,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        "textColor": "dark",
        "alignment": "center",
        "alignSelf": "center",
        "bgColor": "transparent",
        "col": 12,
        "colMd": 6,
        "colLg": 6,
        "whiteSpace": "normal"
    },
    {
        "tag": "img",
        "src": "https://images.unsplash.com/photo-1586672806791-3a67d24186c0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y292ZXIlMjBhcnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
        "responsive": true,
        "alignment": "center",
        "alignSelf": "center",
        "bgColor": "transparent",
        "col": 12,
        "colMd": 6,
        "colLg": 6
    },
    {
        "tag": "custom",
        "elementArray": [
            {
                "tag": "h3",
                "content": "Create your own custom elements",
                "classes": "",
                "typography": {
                    "bold": false,
                    "italic": false,
                    "underline": false,
                    "strikethrough": false
                },
                "textColor": "dark",
                "alignment": "left",
                "alignSelf": "center",
                "bgColor": "transparent",
                "col": 12,
                "colMd": 12,
                "colLg": 12
            },
            {
                "tag": "p",
                "content": "It is built using simple Recursion",
                "classes": "",
                "typography": {
                    "bold": false,
                    "italic": false,
                    "underline": false,
                    "strikethrough": false
                },
                "textColor": "dark",
                "alignment": "left",
                "alignSelf": "center",
                "bgColor": "transparent",
                "col": 12,
                "colMd": 12,
                "colLg": 12,
                "whiteSpace": "normal"
            },
            {
                "tag": "button",
                "href": "",
                "content": "Add Buttons",
                "classes": "",
                "btnColor": "primary",
                "btnOutline": false,
                "iconName": "",
                "iconPosition": "start",
                "alignment": "center",
                "alignSelf": "center",
                "bgColor": "transparent",
                "size": "rg",
                "col": 12,
                "colMd": 12,
                "colLg": 6
            },
            {
                "tag": "button",
                "href": "",
                "content": "Format them",
                "classes": "",
                "btnColor": "secondary",
                "btnOutline": false,
                "iconName": "pen",
                "iconPosition": "start",
                "alignment": "center",
                "alignSelf": "center",
                "bgColor": "transparent",
                "size": "rg",
                "col": 12,
                "colMd": 12,
                "colLg": 6
            }
        ],
        "alignment": "left",
        "alignSelf": "center",
        "bgColor": "transparent",
        "col": 12,
        "colMd": 6,
        "colLg": 6
    },
    {
        "tag": "p",
        "content": "Reorder elements, Change their type without changing content and use Design elements to build the way you want it to be seen",
        "classes": "",
        "typography": {
            "bold": false,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        "textColor": "dark",
        "alignment": "left",
        "alignSelf": "center",
        "bgColor": "transparent",
        "col": 12,
        "colMd": 6,
        "colLg": 6,
        "whiteSpace": "normal"
    },
    {
        "tag": "hr",
        "bgColor": "transparent"
    },
    {
        "tag": "blockquote",
        "content": "It is really easy to add blockquotes and vertical space in Davinci",
        "cite": "Vansh Singh",
        "footerContent": "",
        "classes": "",
        "typography": {
            "bold": false,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        "textColor": "dark",
        "alignment": "left",
        "alignSelf": "center",
        "bgColor": "transparent",
        "col": 12,
        "colMd": 12,
        "colLg": 12
    },
    {
        "tag": "spacer",
        "height": "50",
        "bgColor": "light"
    },
    {
        "tag": "h5",
        "content": "Embed Images, videos , Urls and easily change the aspect ratio of embed",
        "classes": "",
        "typography": {
            "bold": false,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        "textColor": "dark",
        "alignment": "left",
        "alignSelf": "center",
        "bgColor": "transparent",
        "col": 12,
        "colMd": 12,
        "colLg": 12
    },
    {
        "tag": "embed",
        "src": "https://www.youtube.com/embed/_bzATDSKuVs",
        "alignment": "center",
        "alignSelf": "center",
        "bgColor": "transparent",
        "col": 12,
        "colMd": 12,
        "colLg": 12,
        "aspectRatio": "16by9"
    },
    {
        "tag": "carousel",
        "slides": [
            {
                "src": "https://timelinecovers.pro/facebook-cover/download/stunning-little-flowers-facebook-cover.jpg",
                "label": "Add Slide labels",
                "caption": "",
                "textColor": "light"
            },
            {
                "src": "https://thumbs.dreamstime.com/b/baby-s-hand-dark-covers-colored-water-light-shadow-123921865.jpg",
                "label": "Add Carousel",
                "caption": "Change its transition, interval, hide controls indicators",
                "textColor": "light"
            }
        ],
        "animation": "slide",
        "interval": "500",
        "controls": true,
        "indicators": true,
        "alignSelf": "center",
        "bgColor": "transparent",
        "col": 12,
        "colMd": 12,
        "colLg": 12
    },
    {
        "tag": "h5",
        "content": "Add all your social links at a time",
        "classes": "",
        "typography": {
            "bold": false,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        "textColor": "info",
        "alignment": "center",
        "alignSelf": "center",
        "bgColor": "transparent",
        "col": 12,
        "colMd": 12,
        "colLg": 12,
        "whiteSpace": "normal"
    },
    {
        "tag": "socialbtns",
        "instagram": "",
        "facebook": "",
        "twitter": "",
        "whatsapp": "https://wa.me/918279762669",
        "github": "https://github.com/vanssign",
        "linkedin": "https://www.linkedin.com/in/vansh-singh/",
        "youtube": "",
        "google": "",
        "telegram": "",
        "slack": "",
        "discord": "",
        "twitch": "",
        "alignment": "center",
        "alignSelf": "center",
        "bgColor": "transparent",
        "size": "rg",
        "col": 12,
        "colMd": 12,
        "colLg": 12
    },
    {
        "tag": "h3",
        "content": "Whats the end goal of this Project?",
        "classes": "",
        "typography": {
            "bold": false,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        "textColor": "dark",
        "alignment": "left",
        "alignSelf": "center",
        "bgColor": "transparent",
        "col": 12,
        "colMd": 12,
        "colLg": 12
    },
    {
        "tag": "p",
        "content": "Build a Node Package for developers to add blog posting feature to their nextjs sites in a go by just integrating firebase",
        "classes": "",
        "typography": {
            "bold": false,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        "textColor": "dark",
        "alignment": "left",
        "alignSelf": "center",
        "bgColor": "transparent",
        "col": 12,
        "colMd": 12,
        "colLg": 12,
        "whiteSpace": "normal"
    }
]`)
  const [ElementArray, setElementArray] = useState(temp)
  const [PageInfo, setPageInfo] = useState(
    {
      title: "Davinci preview",
      excerpt: "Davinci is a visual block editor inspired by Gutenberg Editor (by wordpress)",
      tags: "next.js, firebase, react hooks, WYSIWYG",
      feautredImage: "https://images.theconversation.com/files/272504/original/file-20190503-103045-ahb7af.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip",
    }
  )
  const [LoginStatus, setLoginStatus] = useState("preview");

  const [Notification, setNotification] = useState("This is just preview of Editor. Login or head to Editor to actually post. Check out all blogs painted through davinci at ");
  const [LiveBlogId, setLiveBlogId] = useState(" ");
  console.log(ElementArray);
  return (
    <>
      <Head>
        <title>DaVinci | Paint your blog ideas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <div>
      <Editor elementArray={ElementArray} LoginStatus={LoginStatus} PreviewStatus={false} updateelementArray={setElementArray} pageInfo={PageInfo} updatepageInfo={setPageInfo} Notification={Notification} LiveBlogId={LiveBlogId} />
    </div>
</>
  )
}
