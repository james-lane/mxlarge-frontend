import styles from './posts.module.css';
import Image from 'next/image';
import { Oswald, Inter } from 'next/font/google';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/sharp-regular-svg-icons';
import { ArticleList } from '@/lib/articleList';

const oswald = Oswald({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function Page({ params }: { params: { slug: string } }) {
  console.log(params.slug);
  const tags = ['VIDEO', 'LIVE', 'STREAM'];
  return (
    <main>
      <div className={classNames(inter.className, styles.clientImg)}>
        <Image
          src="/example-ad.gif"
          alt="Example Ad"
          width={728}
          height={90}
          sizes="100vw"
        />
      </div>
      <Image
        src="/example-story-header-small.jpeg"
        data-src="/example-story-header-small.jpeg"
        alt="Lazy Load Image"
        className={styles.image}
        width={320}
        height={320}
        priority
      />
      <div className={styles.articleDescription}>
        <p className={classNames(oswald.className, styles.title)}>
          WSX Events Cancelled
        </p>
        <div className={classNames(inter.className, styles.meta)}>
          <p className={classNames()}>SEP 10</p>
          <div className={classNames(styles.tags)}>
            <FontAwesomeIcon icon={faTag} className={styles.icon} />
            <ul>
              {tags.map((tag, index) => (
                <li key={index} className={classNames(styles.tag)}>
                  {index === tags.length - 1 ? tag : `${tag},\u00A0`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={classNames(inter.className, styles.clientImg)}>
        <Image
          src="/example-ad.gif"
          alt="Example Ad"
          width={728}
          height={90}
          sizes="100vw"
        />
      </div>
      <div className={styles.content}>
        <p>
          MXLarge has just been informed that SX Global, the promoters of the
          FIM World Supercross Championship (WSX), today announced revisions to
          their 2023 calendar. The 2023 WSX Singapore, German and Canadian
          Grands Prix will not proceed as planned this year; however, the 2023
          WSX Abu Dhabi &amp; Australian Grands Prix will still run as
          scheduled, ensuring an exciting world championship battle of world
          class motor racing remains for 2023.&nbsp;
        </p>

        <p>
          SX Global&rsquo;s CEO, Adam Bailey, noted WSX&rsquo;s continued
          commitment to hosting exceptional events as being at the core of the
          decision, with the calendar revisions being made for the long-term
          benefit of the championship.
        </p>

        <p>
          &ldquo;We want to do everything to the highest standard, and to ensure
          that every WSX experience is a fantastic and memorable one. In keeping
          with this mantra, the new ownership group decided these calendar
          revisions were required at this time. The recency of the ownership
          change has created logistical challenges that are difficult to
          overcome in a matter of weeks.&nbsp;
        </p>

        <p>
          &ldquo;Therefore, we&rsquo;ll instead refocus to make sure that the
          2023 Abu Dhabi and Melbourne WSX events are executed to the best
          possible level, and to continue the important progress of building the
          championship for 2024 and beyond. The 2023 WSX Abu Dhabi &amp;
          Australian Grands Prix remain on-sale and the demand has been very
          strong. It is all systems go for both of these events as I say and
          they are shaping up to be our best events yet, with plenty of
          compelling and exciting racing still to come before our 2023 FIM World
          Supercross Champions are crowned.&rdquo;&nbsp;
        </p>

        <p>
          &ldquo;To the many fans who bought tickets for the WSX event in
          Singapore &ndash; naturally you will receive full refunds. For those
          who have been waiting patiently for German and Canadian WSX updates,
          we understand you&rsquo;ll be frustrated, but we will be back very
          soon to make sure it was worth the wait. These calendar changes have
          been made in alignment with the FIM, who remain fully supportive of
          our drive to make WSX one of the preeminent motorsports&rsquo;
          properties in the world. We&rsquo;d like to thank our supporters for
          their patience and unwavering support throughout this period of
          transition for WSX.&rdquo;&nbsp;
        </p>
      </div>
      <div className={classNames(inter.className, styles.clientImg)}>
        <Image
          src="/example-ad.gif"
          alt="Example Ad"
          width={728}
          height={90}
          sizes="100vw"
        />
      </div>
      <ArticleList title={'More News'} highlight={true} />
    </main>
  );
}
