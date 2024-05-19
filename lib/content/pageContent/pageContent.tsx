import { AdvertComponent } from '@/lib/advert';
import { ArticleCard } from '@/lib/articleCard';
import { Advert, AdvertIndicator, Post } from '@/lib/types';
import styles from '../pageContent.module.css';

export const PageContent = ({ content }: { content: (Post | Advert)[] }) => {
  const structuredContent = () => {
    const pageContent: (Post | Advert | AdvertIndicator)[] = content
      .flatMap((item, i) =>
        (i + 1) % 2 === 0
          ? [item, { _type: 'advert', size: 'leaderboard' }]
          : item
      )
      .flatMap((item, i) =>
        (i + 1) % 6 === 0 ? [item, { _type: 'advert', size: 'sidebar' }] : item
      );

    return pageContent;
  };

  return (
    <div className={styles.page}>
      {structuredContent().map((item, index) => {
        if (item._type === 'advert') {
          const advert = item as AdvertIndicator;
          switch (advert.size) {
            case 'leaderboard' || 'billboard':
              return (
                <AdvertComponent
                  key={index}
                  className={styles.clientImg_leaderboard}
                  size={'leaderboard'}
                />
              );

            default:
              return (
                <AdvertComponent
                  key={index}
                  className={styles.clientImg_sidebar}
                  size={'sidebar'}
                />
              );
          }
        }

        const post = item as Post;
        return (
          <ArticleCard
            key={post._id}
            link={`news/${post?.slug?.current}`}
            title={post.title}
            publishedDate={post.publishedAt || null}
            tags={post.categories || null}
            img={post.imageAsset}
            className={styles.article}
            size={'small'}
          />
        );
      })}
    </div>
  );
};
