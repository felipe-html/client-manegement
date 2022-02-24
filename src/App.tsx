import { Modals } from "./components/Modals"
import { ClientProvider } from "./hooks/useClient"
import { ModalProvider } from "./hooks/useModal"
import { Dashboard } from "./pages/Dashboard"

function App() {

  return (
    <>
      <ClientProvider>
        <ModalProvider>
          <Dashboard />
          <Modals />
        </ModalProvider>
      </ClientProvider>
    </>
  )
}

export default App
