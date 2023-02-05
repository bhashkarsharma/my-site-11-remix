import type React from 'react';

const PageTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = function PostTitle({
    children,
}) {
    return <h1 className="mb-4 text-5xl lg:text-7xl capitalize font-extrabold">{children}</h1>;
};

export default PageTitle;
