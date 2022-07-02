import { tw } from 'brise';

const PostTitle = tw.h2<{ color?: string }>`
  mb-2
  text-3xl
  lg:text-5xl
  capitalize
  font-bold
  ${(props) => (props.color ? `text-${props.color}-400` : '')}
`;

export default PostTitle;
