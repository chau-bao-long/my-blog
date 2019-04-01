import useBlogState from './useBlogState';
import config from '../../../../gatsby-config';

export default posts => {
  const { siteMetadata: { categories } } = config;
  const [state] = useBlogState('categories');
  if (!state) return [];
  if (categories[state.pickedId] === 'ALL') return posts;
  return posts.filter(({ node }) => (
    node.frontmatter.categories.split('/').map(t => t.trim()).includes(categories[state.pickedId])
  ));
};
