import { Component } from 'react';

class CoursePlayerErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('Course player render error:', error);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-6 text-amber-900">
          <p className="font-semibold">Errore nel caricamento del contenuto</p>
          <p className="mt-2 text-sm">
            Il contenuto della lezione non è stato aggiornato correttamente. Puoi riprovare senza
            ricaricare l&apos;intera pagina.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 rounded-full bg-[#55B18D] px-5 py-2 text-sm font-semibold text-white hover:bg-[#439678]"
          >
            Riprova
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CoursePlayerErrorBoundary;
