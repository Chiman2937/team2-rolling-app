import { useApi } from '@/hooks/useApi';
import { getRecipient } from '@/apis/recipientsApi';
import PostHeader from '@/components/PostHeader/PostHeader';
import MessagePage from '@/pages/MessagePage/MessagePage';
function PostHeaderTestPage() {
  const TEST_ID = 11736;
  const { data, loading } = useApi(
    getRecipient,
    { id: TEST_ID },
    { errorMessages: '페이퍼 로딩 실패' },
  );
  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <PostHeader id={data.id} name={data.name} />
      {/* 임시로 id 전달 */}
      <MessagePage id={data.id} />
    </div>
  );
}

export default PostHeaderTestPage;
