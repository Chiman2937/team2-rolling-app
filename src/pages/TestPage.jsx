import { useState } from 'react';
import styles from './TestPage.module.scss';
import { useApi } from '@/hooks/useApi';

/* ---------- API 모듈 ---------- */
import { getBackgroundImages } from '@/apis/backgroundImagesApi';
import { getProfileImages } from '@/apis/profileImagesApi';

import { listRecipients, createRecipient, deleteRecipient } from '@/apis/recipientsApi';

import { listRecipientMessages, createRecipientMessage } from '@/apis/recipientMessageApi';

import { listRecipientReactions, createRecipientReaction } from '@/apis/recipientReactionsApi';

import { getMessage, updateMessage, patchMessage, deleteMessage } from '@/apis/messagesApi';

/* ---------- 페이지 ---------- */
export default function TestPage() {
  return (
    <main className={styles['play']}>
      <h1 className={styles['play__title']}>API Playground</h1>

      <Section title='Background Images'>
        <p className={styles['desc']}>GET / background-images — 기본 배경 썸네일</p>
        <SimpleGet apiFn={getBackgroundImages} />
      </Section>

      <Section title='Profile Images'>
        <p className={styles['desc']}>GET / profile-images — 기본 프로필 썸네일</p>
        <SimpleGet apiFn={getProfileImages} isCircle />
      </Section>

      <RecipientsTester />
      <MessagesTester />
      <MessageDetailTester />
      <ReactionsTester />
    </main>
  );
}

/* ---------- 공통 ---------- */
const Section = ({ title, children }) => (
  <section className={styles['sec']}>
    <h2 className={styles['sec__title']}>{title}</h2>
    {children}
  </section>
);

const Status = ({ loading, error }) => (
  <span className={styles['status']}>
    {loading && '⏳'} {error && '❌'}
  </span>
);

const JsonPane = ({ obj }) => <pre className={styles['json']}>{JSON.stringify(obj, null, 2)}</pre>;

/* ---------- 1) 공통 GET ---------- */
function SimpleGet({ apiFn, isCircle = false }) {
  const { data, loading, error, refetch } = useApi(apiFn);
  const cls = `${styles['thumb']}${isCircle ? ` ${styles['thumb--circle']}` : ''}`;

  return (
    <>
      <button className={styles['btn']} onClick={refetch} disabled={loading}>
        ↻ Refetch
      </button>
      <Status loading={loading} error={error} />

      <div className={styles['grid']}>
        {data?.imageUrls?.map((u) => (
          <img key={u} src={u} className={cls} alt='thumb' />
        ))}
      </div>

      <JsonPane obj={data} />
    </>
  );
}

/* ---------- 2) Recipients (GET / POST / DELETE) ---------- */
function RecipientsTester() {
  const [name, setName] = useState('');
  const [color, setColor] = useState('beige');
  const [limit, setLimit] = useState(20); // ➜ 새 state
  const [offset, setOffset] = useState(0); // ➜ 새 state
  const [selId, setSelId] = useState(null);
  /* 목록 */
  const { data, loading, error, refetch } = useApi(listRecipients, { limit, offset }); // ➜ 입력 값 반영

  /* 생성 */
  const { loading: posting, refetch: doCreate } = useApi(
    createRecipient,
    {},
    { immediate: false, errorMessage: 'Recipient 생성 실패' },
  );

  /* 삭제: id 파라미터를 호출 시 주입 */
  const { loading: deleting, refetch: doDelete } = useApi(
    deleteRecipient,
    {},
    { immediate: false, errorMessage: '삭제 실패' },
  );

  const handleCreate = () => {
    if (!name.trim()) return alert('name 필수');
    doCreate({ name: name.trim(), backgroundColor: color }).then(() => {
      setName('');
      refetch({ limit, offset });
    });
  };

  const handleDelete = (id) => doDelete(id).then(() => refetch({ limit, offset }));

  return (
    <Section title='Recipients'>
      <p className={styles['desc']}>GET / POST / DELETE /2/recipients 엔드포인트</p>
      <p className={styles['desc']}>
        GET:&nbsp; https://rolling-api.vercel.app/2/recipients?limit={limit}&amp;offset={offset}
        <br />
        POST:&nbsp; https://rolling-api.vercel.app/2/recipients
        <br />
        DELETE:&nbsp; https://rolling-api.vercel.app/2/recipients/&#123;id&#125;
      </p>

      {/* Form */}
      <div className={styles['form']}>
        <input
          type='number'
          value={limit}
          min='1'
          onChange={(e) => setLimit(Number(e.target.value))}
          style={{ width: 60 }}
          placeholder='limit'
        />
        <input
          type='number'
          value={offset}
          min='0'
          onChange={(e) => setOffset(Number(e.target.value))}
          style={{ width: 80 }}
          placeholder='offset'
        />
        <input value={name} placeholder='name' onChange={(e) => setName(e.target.value)} />
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          {['beige', 'purple', 'blue', 'green'].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button className={styles['btn']} onClick={handleCreate} disabled={posting}>
          ➕ Create
        </button>
        <button
          className={styles['btn']}
          onClick={() => refetch({ limit, offset })}
          disabled={loading}
        >
          ↻ Refresh
        </button>
        <Status loading={posting} error={null} />
      </div>

      {/* List */}
      <div className={styles['grid']}>
        {data?.results?.map((r) => (
          <div
            key={r.id}
            className={`${styles.card} ${selId === r.id ? styles['card--active'] : ''}`}
            onClick={() => setSelId(r.id)}
          >
            <div
              className={styles['card__thumb']}
              style={{ backgroundImage: `url(${r.backgroundImageURL})` }}
            />
            <div className={styles['card__body']}>
              <strong>{r.name}</strong>
              <p>{r.messageCount} messages</p>
              <button
                className={styles['btn']}
                onClick={() => handleDelete(r.id)}
                disabled={deleting}
              >
                🗑️
              </button>
            </div>
            <JsonPane obj={r} />
          </div>
        ))}
      </div>

      <button className={styles['btn']} onClick={refetch} disabled={loading}>
        ↻ Refresh
      </button>
      <Status loading={loading} error={error} />
    </Section>
  );
}

/* ---------- 3) Recipient Messages (GET / POST) ---------- */
function MessagesTester() {
  const [rid, setRid] = useState('');
  const [msg, setMsg] = useState('');

  /* GET */
  const { data, loading, error, refetch } = useApi(
    listRecipientMessages,
    { recipientId: rid },
    { immediate: false },
  );

  /* POST */
  const { refetch: postMsg, loading: posting } = useApi(
    createRecipientMessage,
    {},
    { immediate: false, errorMessage: '메시지 작성 실패' },
  );

  const fetch = () => refetch({ recipientId: rid });
  const send = () =>
    postMsg({
      recipientId: rid,
      sender: 'tester',
      profileImageURL: 'https://picsum.photos/seed/a/80/80',
      relationship: '친구',
      content: msg,
      font: 'Pretendard',
    }).then(() => {
      setMsg('');
      fetch();
    });

  return (
    <Section title='Recipient Messages'>
      <p className={styles['desc']}>
        GET / POST /2/recipients/<em>{'{rid}'}</em>/messages
      </p>
      <p className={styles['desc']}>
        GET:&nbsp; https://rolling-api.vercel.app/2/recipients/{rid || 'rid'}/messages
        <br />
        POST:&nbsp; https://rolling-api.vercel.app/2/recipients/{rid || 'rid'}/messages
      </p>

      <div className={styles['form']}>
        <input value={rid} placeholder='recipientId' onChange={(e) => setRid(e.target.value)} />
        <button className={styles['btn']} onClick={fetch} disabled={loading}>
          Fetch
        </button>
        <Status loading={loading} error={error} />
      </div>

      {rid && (
        <div className={styles['form']}>
          <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder='new message' />
          <button className={styles['btn']} onClick={send} disabled={posting}>
            Send
          </button>
        </div>
      )}

      <div className={styles['grid']}>
        {data?.results?.map((m) => (
          <div key={m.id} className={styles['card']}>
            <div className={styles['card__body']}>
              <p>{m.content}</p>
              <small>
                {m.sender} · {m.createdAt.slice(0, 10)}
              </small>
            </div>
            <JsonPane obj={m} />
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- 4) Message Detail (GET / PUT / PATCH / DELETE) ---------- */
function MessageDetailTester() {
  const [id, setId] = useState('');
  const [txt, setTxt] = useState('');

  /* GET */
  const { data, loading, error, refetch } = useApi(() => getMessage(id), {}, { immediate: false });

  /* PUT / PATCH / DELETE */
  const { refetch: putMsg, loading: putting } = useApi(
    (p) => updateMessage(id, p),
    {},
    { immediate: false },
  );
  const { refetch: patchMsg, loading: patching } = useApi(
    (p) => patchMessage(id, p),
    {},
    { immediate: false },
  );
  const { refetch: delMsg, loading: deleting } = useApi(
    () => deleteMessage(id),
    {},
    { immediate: false },
  );

  const fetch = () => refetch();
  const put = () =>
    putMsg({
      recipientId: data.recipientId,
      sender: data.sender,
      profileImageURL: data.profileImageURL,
      relationship: data.relationship,
      content: txt || data.content,
      font: data.font,
    }).then(fetch);

  const patch = () => patchMsg({ content: txt }).then(fetch);
  const remove = () =>
    delMsg().then(() => {
      setId('');
      setTxt('');
    });

  return (
    <Section title='Message Detail'>
      <p className={styles['desc']}>
        GET / PUT / PATCH / DELETE /2/messages/<em>{'{id}'}</em>
      </p>
      <p className={styles['desc']}>
        GET:&nbsp; https://rolling-api.vercel.app/2/messages/{id || 'id'}
        <br />
        PUT / PATCH / DELETE 동일 URL
      </p>

      <div className={styles['form']}>
        <input value={id} placeholder='messageId' onChange={(e) => setId(e.target.value)} />
        <button className={styles['btn']} onClick={fetch} disabled={loading}>
          Fetch
        </button>
        <Status loading={loading} error={error} />
      </div>

      {data && (
        <>
          <input
            value={txt}
            onChange={(e) => setTxt(e.target.value)}
            placeholder='new content'
            className={styles['form__wide']}
          />
          <div className={styles['form']}>
            <button className={styles['btn']} onClick={put} disabled={putting}>
              PUT
            </button>
            <button className={styles['btn']} onClick={patch} disabled={patching}>
              PATCH
            </button>
            <button className={styles['btn']} onClick={remove} disabled={deleting}>
              🗑️
            </button>
          </div>
        </>
      )}

      <JsonPane obj={data} />
    </Section>
  );
}

/* ---------- 5) Reactions (GET / POST) ---------- */
function ReactionsTester() {
  const [rid, setRid] = useState('');
  const [emoji, setEmo] = useState('🎉');

  /* GET */
  const { data, loading, error, refetch } = useApi(
    listRecipientReactions,
    { recipientId: rid },
    { immediate: false },
  );

  /* POST */
  const { refetch: addReact, loading: posting } = useApi(
    createRecipientReaction,
    {},
    { immediate: false },
  );

  const fetch = () => refetch({ recipientId: rid });
  const create = () => addReact({ recipientId: rid, emoji, type: 'increase' }).then(fetch);

  return (
    <Section title='Reactions'>
      <p className={styles['desc']}>
        GET / POST /2/recipients/<em>{'{rid}'}</em>/reactions
      </p>
      <p className={styles['desc']}>
        GET:&nbsp; https://rolling-api.vercel.app/2/recipients/{rid || 'rid'}/reactions
        <br />
        POST:&nbsp; https://rolling-api.vercel.app/2/recipients/{rid || 'rid'}/reactions
      </p>

      <div className={styles['form']}>
        <input value={rid} placeholder='recipientId' onChange={(e) => setRid(e.target.value)} />
        <button className={styles['btn']} onClick={fetch} disabled={loading}>
          Fetch
        </button>
        <Status loading={loading} error={error} />
      </div>

      {rid && (
        <div className={styles['form']}>
          <input value={emoji} onChange={(e) => setEmo(e.target.value)} />
          <button className={styles['btn']} onClick={create} disabled={posting}>
            ➕
          </button>
        </div>
      )}

      <div className={styles['grid']}>
        {data?.results?.map((r) => (
          <span key={r.id} className={styles['badge']}>
            {r.emoji} × {r.count}
          </span>
        ))}
      </div>

      <JsonPane obj={data} />
    </Section>
  );
}
