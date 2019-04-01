import useBlogState from './useBlogState';
import config from '../../../../gatsby-config';

export default posts => {
  const { siteMetadata: { categories } } = config;
  const [{ pickedId }] = useBlogState('categories');
  if (categories[pickedId] === 'ALL') return posts;
  return posts.filter(({ node }) => (
    node.frontmatter.categories.split('/').map(t => t.trim()).includes(categories[pickedId])
  ));
};
