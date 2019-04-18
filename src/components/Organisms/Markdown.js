import React from "react";
import rehypeReact from "rehype-react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

const testComponent = ({ children }) => (
  <>マークダウンへのコンポーネントの埋め込み成功！！！{children}</>
);

const SecondaryTitle = ({ children }) => (
  <Typography component="h2" variant="h4" paragraph>
    {children}
  </Typography>
);

const TertiaryTitle = ({ children }) => (
  <Typography component="h3" variant="h5" paragraph>
    {children}
  </Typography>
);

const Paragraph = ({ children }) => (
  <Typography component="p" variant="body1" paragraph>
    {children}
  </Typography>
);

// const Bold = ({ children }) => (
//   <Typography component="span" variant="body1" paragraph>
//     {children}
//   </Typography>
// );

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    "name-of-component": testComponent,
    // h1: PrimaryTitle,
    h2: SecondaryTitle,
    h3: TertiaryTitle,
    p: Paragraph
    // strong:Bold,
    // em:Italic,
    // code:Code,
    // blockquote:Blockquote,
  }
}).Compiler;

// export default ({ content }) => renderAst(content);

export default ({ content }) => (
  <div
    className="markdown-body"
    dangerouslySetInnerHTML={{ __html: content }}
  />
);
