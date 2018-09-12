--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.9
-- Dumped by pg_dump version 9.6.9

-- Started on 2018-08-19 20:47:13 -05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2257 (class 0 OID 0)
-- Dependencies: 2256
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- TOC entry 1 (class 3079 OID 12469)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2259 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 189 (class 1259 OID 16405)
-- Name: capitulo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.capitulo (
    id_capitulos integer NOT NULL,
    id_recorridos integer,
    id_video integer NOT NULL,
    numerovideos character varying(30),
    descripcion character varying(50)
);


ALTER TABLE public.capitulo OWNER TO postgres;

--
-- TOC entry 191 (class 1259 OID 16426)
-- Name: pregunta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pregunta (
    id_preguntas integer NOT NULL,
    audio character varying(50) NOT NULL,
    imagen1 character varying(50) NOT NULL,
    imagen2 character varying(50) NOT NULL,
    id_video integer NOT NULL,
    respuesta character varying(50)
);


ALTER TABLE public.pregunta OWNER TO postgres;

--
-- TOC entry 188 (class 1259 OID 16400)
-- Name: recorrido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recorrido (
    id_recorrido integer NOT NULL,
    nombre character varying(50) NOT NULL,
    figura_portada character varying(50) NOT NULL,
    numero_capitulo character varying(30),
    id_capitulo integer NOT NULL
);


ALTER TABLE public.recorrido OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 16390)
-- Name: rol; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rol (
    id_roles integer NOT NULL,
    role character varying(30) NOT NULL,
    id_rolesoption integer NOT NULL
);


ALTER TABLE public.rol OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 16395)
-- Name: rol_opcion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rol_opcion (
    id_opciones integer NOT NULL,
    descripcion character varying(30) NOT NULL
);


ALTER TABLE public.rol_opcion OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 16385)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    nick_name character(50) NOT NULL,
    nombre character varying(30) NOT NULL,
    password character varying(30) NOT NULL,
    id_role integer NOT NULL
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 190 (class 1259 OID 16416)
-- Name: video; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.video (
    id_video integer NOT NULL,
    url character varying(50),
    titulo character varying(50) NOT NULL,
    descripcion character varying(50) NOT NULL,
    creditos character varying(50) NOT NULL,
    portada character varying(50) NOT NULL,
    id_pregunta integer NOT NULL,
    numeropregunta character varying(30) NOT NULL
);


ALTER TABLE public.video OWNER TO postgres;

--
-- TOC entry 2248 (class 0 OID 16405)
-- Dependencies: 189
-- Data for Name: capitulo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.capitulo (id_capitulos, id_recorridos, id_video, numerovideos, descripcion) FROM stdin;
\.


--
-- TOC entry 2250 (class 0 OID 16426)
-- Dependencies: 191
-- Data for Name: pregunta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pregunta (id_preguntas, audio, imagen1, imagen2, id_video, respuesta) FROM stdin;
\.


--
-- TOC entry 2247 (class 0 OID 16400)
-- Dependencies: 188
-- Data for Name: recorrido; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recorrido (id_recorrido, nombre, figura_portada, numero_capitulo, id_capitulo) FROM stdin;
\.


--
-- TOC entry 2245 (class 0 OID 16390)
-- Dependencies: 186
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rol (id_roles, role, id_rolesoption) FROM stdin;
\.


--
-- TOC entry 2246 (class 0 OID 16395)
-- Dependencies: 187
-- Data for Name: rol_opcion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rol_opcion (id_opciones, descripcion) FROM stdin;
\.


--
-- TOC entry 2244 (class 0 OID 16385)
-- Dependencies: 185
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id_usuario, nick_name, nombre, password, id_role) FROM stdin;
\.


--
-- TOC entry 2249 (class 0 OID 16416)
-- Dependencies: 190
-- Data for Name: video; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.video (id_video, url, titulo, descripcion, creditos, portada, id_pregunta, numeropregunta) FROM stdin;
\.


--
-- TOC entry 2115 (class 2606 OID 16409)
-- Name: capitulo idcapitulo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.capitulo
    ADD CONSTRAINT idcapitulo PRIMARY KEY (id_capitulos);


--
-- TOC entry 2110 (class 2606 OID 16399)
-- Name: rol_opcion idoptions; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_opcion
    ADD CONSTRAINT idoptions PRIMARY KEY (id_opciones);


--
-- TOC entry 2120 (class 2606 OID 16430)
-- Name: pregunta idpreguntas; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pregunta
    ADD CONSTRAINT idpreguntas PRIMARY KEY (id_preguntas);


--
-- TOC entry 2113 (class 2606 OID 16404)
-- Name: recorrido idrecorridos; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recorrido
    ADD CONSTRAINT idrecorridos PRIMARY KEY (id_recorrido);


--
-- TOC entry 2108 (class 2606 OID 16394)
-- Name: rol idrole; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT idrole PRIMARY KEY (id_roles);


--
-- TOC entry 2105 (class 2606 OID 16389)
-- Name: usuario idusuario; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT idusuario PRIMARY KEY (id_usuario);


--
-- TOC entry 2118 (class 2606 OID 16420)
-- Name: video idvideo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video
    ADD CONSTRAINT idvideo PRIMARY KEY (id_video);


--
-- TOC entry 2111 (class 1259 OID 16415)
-- Name: fki_idcapitulo; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_idcapitulo ON public.recorrido USING btree (id_capitulo);


--
-- TOC entry 2116 (class 1259 OID 16441)
-- Name: fki_idpregunta; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_idpregunta ON public.video USING btree (id_pregunta);


--
-- TOC entry 2103 (class 1259 OID 16453)
-- Name: fki_idrol; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_idrol ON public.usuario USING btree (id_role);


--
-- TOC entry 2106 (class 1259 OID 16447)
-- Name: fki_idrolopcion; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_idrolopcion ON public.rol USING btree (id_rolesoption);


--
-- TOC entry 2123 (class 2606 OID 16410)
-- Name: recorrido idcapitulo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recorrido
    ADD CONSTRAINT idcapitulo FOREIGN KEY (id_capitulo) REFERENCES public.capitulo(id_capitulos);


--
-- TOC entry 2125 (class 2606 OID 16436)
-- Name: video idpregunta; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video
    ADD CONSTRAINT idpregunta FOREIGN KEY (id_pregunta) REFERENCES public.pregunta(id_preguntas);


--
-- TOC entry 2121 (class 2606 OID 16448)
-- Name: usuario idrol; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT idrol FOREIGN KEY (id_role) REFERENCES public.rol(id_roles);


--
-- TOC entry 2122 (class 2606 OID 16442)
-- Name: rol idrolopcion; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT idrolopcion FOREIGN KEY (id_rolesoption) REFERENCES public.rol_opcion(id_opciones);


--
-- TOC entry 2124 (class 2606 OID 16421)
-- Name: capitulo idvideo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.capitulo
    ADD CONSTRAINT idvideo FOREIGN KEY (id_video) REFERENCES public.video(id_video);


--
-- TOC entry 2126 (class 2606 OID 16431)
-- Name: pregunta idvideo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pregunta
    ADD CONSTRAINT idvideo FOREIGN KEY (id_video) REFERENCES public.video(id_video);


-- Completed on 2018-08-19 20:47:13 -05

--
-- PostgreSQL database dump complete
--

