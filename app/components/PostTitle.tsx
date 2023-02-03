import type React from 'react';

interface PostTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    color?: string;
}

const PostTitle: React.FC<PostTitleProps> = function PostTitle({ color, children }) {
    return (
        <h2
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className={`mb-2 text-3xl lg:text-5xl capitalize font-bold ${
                color ? `text-${color}-400` : ''
            }`}
        >
            {children}
        </h2>
    );
};

PostTitle.defaultProps = {
    color: 'magenta',
};

export default PostTitle;
