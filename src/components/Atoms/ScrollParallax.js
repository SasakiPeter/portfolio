import React from "react";
import { css } from "react-emotion";
import ScrollAnim from "rc-scroll-anim";

const ScrollParallax = ScrollAnim.Parallax;

const ScrollOverPack = ScrollAnim.OverPack;

/* 本当はqueueAnim使うべきなんだろうけど、うまくいかない */
export default ({ children }) => (
  <ScrollParallax
    animation={[
      {
        translateX: 0,
        translateY: 0,
        playScale: [0, 0.3]
      }
      // {
      //   opacity: 1,
      //   playScale: [0, 0.6]
      // },
      // {
      //   opacity: 1,
      //   playScale: [0, 0.2]
      // }
    ]}
    className={css`
      transform: translateX(-100%) translateY(100px);
    `}
  >
    {children}
  </ScrollParallax>
);

// import ScrollAnim from "rc-scroll-anim";
// import QueueAnim from "rc-queue-anim";
// import TweenOne from "rc-tween-one";
// import Animate from "rc-animate";

// ↓カクツキが酷い
// <ScrollParallax
//   key={post.id}
//   animation={[
//     {
//       opacity: 0,
//       x: 0,
//       y: 0,
//       playScale: [0, 0.15]
//     },
//     {
//       opacity: 1,
//       x: 0,
//       y: 0,
//       playScale: [0, 0.7]
//     },
//     {
//       opacity: 0,
//       x: 50,
//       y: 100,
//       playScale: [0, 0.15]
//     }
//   ]}
//   className={css`
//     opacity: 0;
//     transform: translateX(50px) translateY(100px);
//   `}
// >
//   <article>
//     <Link to={post.fields.slug}>
//       <Paper>
//         <Typography component="h3" variant="h5">
//           {post.frontmatter.title}
//           {/* <span>{post.frontmatter.date}</span> */}
//         </Typography>
//         <Typography component="p">{post.excerpt}</Typography>
//         {/* <img src={post.frontmatter.image} alt="hoge" /> */}
//       </Paper>
//     </Link>
//   </article>
// </ScrollParallax>

// <ScrollOverPack key={post.id} replay playScale={0.2}>
//   <TweenOne
//     className={css`
//       transform: translateX(50px) translateY(100px);
//       opacity: 0;
//     `}
//     animation={{ x: 0, y: 0, opacity: 1 }}
//   >
//     <article>
//       <Link to={post.fields.slug}>
//         <Paper>
//           <Typography component="h3" variant="h5">
//             {post.frontmatter.title}
//             {/* <span>{post.frontmatter.date}</span> */}
//           </Typography>
//           <Typography component="p">{post.excerpt}</Typography>
//           {/* <img src={post.frontmatter.image} alt="hoge" /> */}
//         </Paper>
//       </Link>
//     </article>
//   </TweenOne>
// </ScrollOverPack>
