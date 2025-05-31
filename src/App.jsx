import CardModal from './components/CardModal';
import SenderProfile from './components/SenderProfile';
function App() {
  return (
    <>
      <CardModal>
        <CardModal.headerArea>
          <SenderProfile sender='김치영' imageUrl={null} createdAt='2023.07.08' />
        </CardModal.headerArea>

        <CardModal.divider />

        <CardModal.contentArea>
          '코로나가 또다시 기승을 부리는 요즘이네요.코로나가 또다시 기승을 부리는
          요즘이네요.코로나가 또다시 기승을 부리는 요즘이네요.'
        </CardModal.contentArea>

        <CardModal.buttonArea>
          <button>클릭</button>
        </CardModal.buttonArea>
      </CardModal>
    </>
  );
}

export default App;
