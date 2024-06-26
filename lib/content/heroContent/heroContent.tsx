import { AdvertComponent } from '@/lib/advert';
import { ArticleCard } from '@/lib/articleCard';
import { Advert, AdvertIndicator, Post } from '@/lib/types';
import classnames from 'classnames';
import heroStyles from './heroContent.module.css';
import styles from '../pageContent.module.css';

export const HeroContent = ({
  adverts,
  content,
}: {
  adverts: Advert[];
  content: (Post | Advert | AdvertIndicator)[];
}) => {
  content.splice(1, 0, {
    _type: 'advert',
    size: 'leaderboard',
  });

  content.push(
    {
      _type: 'advert',
      size: 'leaderboard',
    },
    {
      _type: 'advert',
      size: 'sidebar',
    }
  );

  return (
    <div className={styles.page}>
      {content.map((item, index) => {
        if (item._type === 'advert') {
          const advert = item as AdvertIndicator;
          switch (advert.size) {
            case 'leaderboard' || 'billboard':
              return (
                <AdvertComponent
                  adverts={adverts}
                  key={index}
                  className={styles.clientImg_leaderboard}
                  size={'leaderboard'}
                />
              );

            default:
              return (
                <AdvertComponent
                  adverts={adverts}
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
            className={classnames(
              styles.article,
              index === 0 && heroStyles.heroArticle
            )}
            size={index === 0 ? 'large' : 'small'}
          />
        );
      })}
    </div>
  );
};
