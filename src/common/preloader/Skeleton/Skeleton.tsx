import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={220}
    height={300}
    viewBox="0 0 220 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ededed"
  >
    <rect x="240" y="81" rx="0" ry="0" width="69" height="26" />
    <rect x="519" y="81" rx="0" ry="0" width="27" height="26" />
    <rect x="371" y="82" rx="0" ry="0" width="90" height="25" />
    <rect x="27" y="3" rx="0" ry="0" width="160" height="26" />
    <rect x="27" y="33" rx="0" ry="0" width="160" height="26" />
    <rect x="27" y="62" rx="0" ry="0" width="160" height="26" />
  </ContentLoader>
);
