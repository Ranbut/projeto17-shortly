PGDMP     "    ,                {            postgres    15.2    15.2                 0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    5    postgres    DATABASE        CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE postgres;
                postgres    false                       0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3353                        3079    16384 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false                       0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2            �            1259    25677    sessions    TABLE        CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token character varying NOT NULL
);
    DROP TABLE public.sessions;
       public         heap    postgres    false            �            1259    25676    sessions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.sessions_id_seq;
       public          postgres    false    218                       0    0    sessions_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;
          public          postgres    false    217            �            1259    25691 
   shortsUrls    TABLE     �   CREATE TABLE public."shortsUrls" (
    id integer NOT NULL,
    "shortUrl" character varying(8) NOT NULL,
    url character varying NOT NULL,
    "userId" integer NOT NULL,
    "visitCount" integer NOT NULL,
    "createdAt" date DEFAULT now() NOT NULL
);
     DROP TABLE public."shortsUrls";
       public         heap    postgres    false            �            1259    25690    shortsUrls_id_seq    SEQUENCE     �   CREATE SEQUENCE public."shortsUrls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."shortsUrls_id_seq";
       public          postgres    false    220                       0    0    shortsUrls_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."shortsUrls_id_seq" OWNED BY public."shortsUrls".id;
          public          postgres    false    219            �            1259    25657    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    25656    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            q           2604    25680    sessions id    DEFAULT     j   ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);
 :   ALTER TABLE public.sessions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            r           2604    25694    shortsUrls id    DEFAULT     r   ALTER TABLE ONLY public."shortsUrls" ALTER COLUMN id SET DEFAULT nextval('public."shortsUrls_id_seq"'::regclass);
 >   ALTER TABLE public."shortsUrls" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            p           2604    25660    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216                      0    25677    sessions 
   TABLE DATA           7   COPY public.sessions (id, "userId", token) FROM stdin;
    public          postgres    false    218   "                 0    25691 
   shortsUrls 
   TABLE DATA           `   COPY public."shortsUrls" (id, "shortUrl", url, "userId", "visitCount", "createdAt") FROM stdin;
    public          postgres    false    220   "                 0    25657    users 
   TABLE DATA           :   COPY public.users (id, name, email, password) FROM stdin;
    public          postgres    false    216   <"                  0    0    sessions_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.sessions_id_seq', 1, false);
          public          postgres    false    217                        0    0    shortsUrls_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."shortsUrls_id_seq"', 1, false);
          public          postgres    false    219            !           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    215            y           2606    25684    sessions sessions_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_pkey;
       public            postgres    false    218            {           2606    25699    shortsUrls shortsUrls_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."shortsUrls"
    ADD CONSTRAINT "shortsUrls_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."shortsUrls" DROP CONSTRAINT "shortsUrls_pkey";
       public            postgres    false    220            }           2606    25701 "   shortsUrls shortsUrls_shortUrl_key 
   CONSTRAINT     g   ALTER TABLE ONLY public."shortsUrls"
    ADD CONSTRAINT "shortsUrls_shortUrl_key" UNIQUE ("shortUrl");
 P   ALTER TABLE ONLY public."shortsUrls" DROP CONSTRAINT "shortsUrls_shortUrl_key";
       public            postgres    false    220            u           2606    25666    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    216            w           2606    25664    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            ~           2606    25685    sessions sessions_userId_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);
 I   ALTER TABLE ONLY public.sessions DROP CONSTRAINT "sessions_userId_fkey";
       public          postgres    false    216    3191    218                       2606    25702 !   shortsUrls shortsUrls_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."shortsUrls"
    ADD CONSTRAINT "shortsUrls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);
 O   ALTER TABLE ONLY public."shortsUrls" DROP CONSTRAINT "shortsUrls_userId_fkey";
       public          postgres    false    3191    220    216                  x������ � �            x������ � �            x������ � �     