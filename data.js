window.NEXAH = {
  stream: "https://ice4.somafm.com/groovesalad-128-mp3",
  agents: [
    { id: "vero", name: "Vero", role: "Noticias", job: "Titulares, clima, servicio NEA. Escribe y lee el corte." },
    { id: "diego", name: "Diego", role: "Continuidad", job: "Controla tono, repeticion y reglas. Si no pasa, no sale." },
    { id: "pablo", name: "Pablo", role: "Musica", job: "Arma la playlist, los cruces y el movimiento entre bloques." },
    { id: "sofi", name: "Sofi", role: "Comercial", job: "Spots, inventario y disparos de pauta local." }
  ],
  dayparts: [
    { range: "06-10", title: "Apertura", agent: "Vero", text: "Noticias Formosa y NEA, clima, servicio. Diego valida cada corte." },
    { range: "10-14", title: "Operacion", agent: "Pablo", text: "Musica + spots PyME. Sofi rota inventario. Nexus cobranza." },
    { range: "14-20", title: "Tarde", agent: "Vero", text: "Titulares rotativos, entrevistas cortas, pauta local." },
    { range: "20-06", title: "Senal nocturna", agent: "Pablo", text: "Musica + flashes. Si cae un bloque, entra buffer. Cero silencio." }
  ],
  archive: [
    { title: "Formosa despierta", agent: "Vero", kind: "NOTICIAS", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=70" },
    { title: "Corte Banco Formosa", agent: "Sofi", kind: "SPOT 25", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=70" },
    { title: "Nexus cobranza bloque 2", agent: "Diego", kind: "OPERACION", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=70" },
    { title: "Senal en movimiento", agent: "Pablo", kind: "MUSICA", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=70" },
    { title: "Clima NEA 14 hs", agent: "Vero", kind: "SERVICIO", img: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=70" },
    { title: "Linar solar", agent: "Sofi", kind: "SPOT 20", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=70" },
    { title: "Nocturna Formosa", agent: "Pablo", kind: "MUSICA", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=70" },
    { title: "Flash transito", agent: "Vero", kind: "SERVICIO", img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=70" }
  ],
  tracks: [
    "Daft Punk Get Lucky",
    "Bizarrap music session",
    "Soda Stereo Persiana Americana",
    "Fito Paez 11 y 6",
    "Charly Garcia Demoliendo hoteles",
    "Nathy Peluso Business Woman",
    "Wos Tierra de Juegos",
    "Trueno Dance Crip"
  ],
  spots: [
    { title: "Banco Formosa", dur: "25s", agent: "Sofi" },
    { title: "Nexus cobranza", dur: "20s", agent: "Sofi" },
    { title: "PyMEs NEA", dur: "15s", agent: "Sofi" },
    { title: "Linar Ferreteria", dur: "20s", agent: "Sofi" }
  ]
};
