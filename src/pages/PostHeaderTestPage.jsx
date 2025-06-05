import { useApi } from '@/hooks/useApi';
import { getRecipient } from '@/apis/recipientsApi';
import PostHeader from '@/components/PostHeader/PostHeader';
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

  return <PostHeader id={data.id} name={data.name} />;
}

export default PostHeaderTestPage;
