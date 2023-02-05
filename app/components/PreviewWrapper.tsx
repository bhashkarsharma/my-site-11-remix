type PreviewWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    onClick: () => void;
};

const PreviewWrapper: React.FC<PreviewWrapperProps> = function PreviewWrapper({
    onClick,
    children,
}) {
    return (
        <div
            className="card bg-neutral text-white shadow-xl image-full"
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={onClick}
        >
            {children}
        </div>
    );
};

export default PreviewWrapper;
