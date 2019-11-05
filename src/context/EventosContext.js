import React, { Component } from "react";
import axios from "axios";

const EventosContext = React.createContext();
export const EventosConsumer = EventosContext.Consumer;

class EventosProvider extends Component {
  token = "3AVFZKAKO5XEVCR77NZR";
  ordenarPor = "date";
  baseUrl =
    "https://www.eventbriteapi.com/v3/events/search/";
  baseLocale = "es_ES";

  state = {
    eventos: []
  };

  obtenerEventos = async busqueda => {
    let url = `${this.baseUrl}?q=${busqueda.nombre}&categories=${busqueda.categoria}&sort_by=${this.ordenarPor}&token=${this.token}&locale=${this.baseLocale}`;
    console.log(url);
    let eventos = await axios.get(url);
    console.log(eventos.data.events);
    this.setState({ eventos: eventos.data.events });
  };

  render() {
    return (
      <EventosContext.Provider
        value={{
          eventos: this.state.eventos,
          obtenerEventos: this.obtenerEventos
        }}
      >
        {this.props.children}
      </EventosContext.Provider>
    );
  }
}

export default EventosProvider;
