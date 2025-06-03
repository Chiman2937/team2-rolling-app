// ─────────────────────────────────────────────────────────────────────────────
// TestPage.jsx
// ─────────────────────────────────────────────────────────────────────────────
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
  //백엔드 테스트

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

/* ---------- 공통 컴포넌트 ---------- */
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
      <button className={styles['btn']} onClick={() => refetch({})} disabled={loading}>
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
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [selId, setSelId] = useState(null);

  // 목록 조회: listRecipients({ limit, offset })
  const { data, loading, error, refetch } = useApi(listRecipients, { limit, offset });

  // 생성: createRecipient({ name, backgroundColor })
  const { loading: posting, refetch: doCreate } = useApi(
    createRecipient,
    {},
    { immediate: false, errorMessage: 'Recipient 생성 실패' },
  );

  // 삭제: deleteRecipient({ id })
  const { loading: deleting, refetch: doDelete } = useApi(
    deleteRecipient,
    {},
    { immediate: false, errorMessage: 'Recipient 삭제 실패' },
  );

  const handleCreate = () => {
    if (!name.trim()) return alert('name 필수');
    doCreate({ name: name.trim(), backgroundColor: color }).then(() => {
      setName('');
      refetch({ limit, offset });
    });
  };

  const handleDelete = (id) =>
    doDelete({ id }).then(() => {
      if (selId === id) setSelId(null);
      refetch({ limit, offset });
    });

  return (
    <Section title='Recipients'>
      <p className={styles['desc']}>GET / POST / DELETE /2/recipients</p>
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
            <option key={c} value={c}>
              {c}
            </option>
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(r.id);
                }}
                disabled={deleting}
              >
                🗑️
              </button>
            </div>
            <JsonPane obj={r} />
          </div>
        ))}
      </div>

      <button
        className={styles['btn']}
        onClick={() => refetch({ limit, offset })}
        disabled={loading}
      >
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

  // GET: listRecipientMessages({ recipientId: rid })
  const { data, loading, error, refetch } = useApi(
    listRecipientMessages,
    { recipientId: rid },
    { immediate: false },
  );

  // POST: createRecipientMessage({ recipientId, sender, profileImageURL, relationship, content, font })
  const { refetch: postMsg, loading: posting } = useApi(
    createRecipientMessage,
    {},
    { immediate: false, errorMessage: '메시지 작성 실패' },
  );

  const fetch = () => {
    if (!rid.trim()) return;
    refetch({ recipientId: rid });
  };

  const send = () => {
    if (!rid.trim() || !msg.trim()) return;
    postMsg({
      recipientId: rid,
      sender: 'tester',
      profileImageURL: 'https://picsum.photos/seed/a/80/80',
      relationship: '친구',
      content: msg.trim(),
      font: 'Pretendard',
    }).then(() => {
      setMsg('');
      fetch();
    });
  };

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

/* ---------- 4) Message Detail (GET · PUT · PATCH · DELETE) ---------- */
function MessageDetailTester() {
  const [id, setId] = useState('');
  const [txt, setTxt] = useState('');

  // GET: getMessage({ id })
  const {
    data,
    loading,
    error,
    refetch: fetchMsg,
  } = useApi(getMessage, { id }, { immediate: false });

  // PUT: updateMessage({ id, recipientId, sender, profileImageURL, relationship, content, font })
  const { refetch: putMsg, loading: putting } = useApi(
    updateMessage,
    {},
    { immediate: false, errorMessage: '메시지 전체 수정 실패' },
  );

  // PATCH: patchMessage({ id, ...fieldsToPatch })
  const { refetch: patchMsg, loading: patching } = useApi(
    patchMessage,
    {},
    { immediate: false, errorMessage: '메시지 부분 수정 실패' },
  );

  // DELETE: deleteMessage({ id })
  const { refetch: delMsg, loading: deleting } = useApi(
    deleteMessage,
    {},
    { immediate: false, errorMessage: '메시지 삭제 실패' },
  );

  const fetch = () => {
    if (!id.trim()) return;
    fetchMsg({ id });
  };

  const handlePut = () => {
    if (!data) return;
    putMsg({
      id,
      recipientId: data.recipientId,
      sender: data.sender,
      profileImageURL: data.profileImageURL,
      relationship: data.relationship,
      content: txt.trim() || data.content,
      font: data.font,
    }).then(() => {
      setTxt('');
      fetch();
    });
  };

  const handlePatch = () => {
    if (!data) return;
    patchMsg({
      id,
      content: txt.trim() || data.content,
    }).then(() => {
      setTxt('');
      fetch();
    });
  };

  const handleDelete = () => {
    if (!id.trim()) return;
    delMsg({ id }).then(() => {
      setId('');
      setTxt('');
    });
  };

  return (
    <Section title='Message Detail'>
      <p className={styles['desc']}>
        GET / PUT / PATCH / DELETE /2/messages/<em>{'{id}'}</em>
      </p>

      <div className={styles['form']}>
        <input value={id} placeholder='messageId' onChange={(e) => setId(e.target.value)} />
        <button className={styles['btn']} onClick={fetch} disabled={!id.trim() || loading}>
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
            <button className={styles['btn']} onClick={handlePut} disabled={putting}>
              PUT
            </button>
            <button className={styles['btn']} onClick={handlePatch} disabled={patching}>
              PATCH
            </button>
            <button className={styles['btn']} onClick={handleDelete} disabled={deleting}>
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

  // GET: listRecipientReactions({ recipientId: rid })
  const { data, loading, error, refetch } = useApi(
    listRecipientReactions,
    { recipientId: rid },
    { immediate: false },
  );

  // POST: createRecipientReaction({ recipientId, emoji, type })
  const { refetch: addReact, loading: posting } = useApi(
    createRecipientReaction,
    {},
    { immediate: false, errorMessage: '리액션 생성 실패' },
  );

  const fetch = () => {
    if (!rid.trim()) return;
    refetch({ recipientId: rid });
  };

  const create = () => {
    if (!rid.trim()) return;
    addReact({ recipientId: rid, emoji, type: 'increase' }).then(() => {
      setEmo('🎉');
      fetch();
    });
  };

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
