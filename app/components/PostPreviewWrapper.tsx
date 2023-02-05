import type React from 'react';

const PostPreviewWrapper: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = function PostTitle({
    children,
}) {
    return (
        <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
            {children}
        </div>
    );
};

export default PostPreviewWrapper;
