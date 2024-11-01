PGDMP                  	    |            AmorMXFinal    16.4    16.4 q    t           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            u           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            v           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            w           1262    16520    AmorMXFinal    DATABASE     �   CREATE DATABASE "AmorMXFinal" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE "AmorMXFinal";
                postgres    false            �            1259    24882    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeMeta";
       public         heap    postgres    false            �            1259    16521    categorias_inventario    TABLE     �   CREATE TABLE public.categorias_inventario (
    id integer NOT NULL,
    nombre_categoria character varying(100),
    estado boolean
);
 )   DROP TABLE public.categorias_inventario;
       public         heap    postgres    false            �            1259    16524    categorias_inventario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categorias_inventario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.categorias_inventario_id_seq;
       public          postgres    false    215            x           0    0    categorias_inventario_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.categorias_inventario_id_seq OWNED BY public.categorias_inventario.id;
          public          postgres    false    216            �            1259    16525    categorias_platos    TABLE     �   CREATE TABLE public.categorias_platos (
    id integer NOT NULL,
    nombre_categoria character varying(100),
    estado boolean
);
 %   DROP TABLE public.categorias_platos;
       public         heap    postgres    false            �            1259    16528    categorias_platos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categorias_platos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.categorias_platos_id_seq;
       public          postgres    false    217            y           0    0    categorias_platos_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.categorias_platos_id_seq OWNED BY public.categorias_platos.id;
          public          postgres    false    218            �            1259    16529    facturas    TABLE     �   CREATE TABLE public.facturas (
    id integer NOT NULL,
    numero integer,
    total integer,
    fecha date,
    id_pedido integer
);
    DROP TABLE public.facturas;
       public         heap    postgres    false            �            1259    16532    facturas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.facturas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.facturas_id_seq;
       public          postgres    false    219            z           0    0    facturas_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.facturas_id_seq OWNED BY public.facturas.id;
          public          postgres    false    220            �            1259    16533    ingredientes    TABLE     �   CREATE TABLE public.ingredientes (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    unidad character varying(50)
);
     DROP TABLE public.ingredientes;
       public         heap    postgres    false            �            1259    16536    ingredientes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ingredientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.ingredientes_id_seq;
       public          postgres    false    221            {           0    0    ingredientes_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.ingredientes_id_seq OWNED BY public.ingredientes.id;
          public          postgres    false    222            �            1259    16537 
   inventario    TABLE     �   CREATE TABLE public.inventario (
    id integer NOT NULL,
    cantidad integer NOT NULL,
    fecha_ingreso date,
    fecha_vencimiento date,
    id_categoria integer,
    id_ingrediente integer
);
    DROP TABLE public.inventario;
       public         heap    postgres    false            �            1259    16540    inventario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.inventario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.inventario_id_seq;
       public          postgres    false    223            |           0    0    inventario_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.inventario_id_seq OWNED BY public.inventario.id;
          public          postgres    false    224            �            1259    16541    mesas    TABLE     {   CREATE TABLE public.mesas (
    id integer NOT NULL,
    numero character varying(10),
    estado character varying(20)
);
    DROP TABLE public.mesas;
       public         heap    postgres    false            �            1259    16544    mesas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mesas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.mesas_id_seq;
       public          postgres    false    225            }           0    0    mesas_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.mesas_id_seq OWNED BY public.mesas.id;
          public          postgres    false    226            �            1259    16545    pedidos    TABLE     �   CREATE TABLE public.pedidos (
    id integer NOT NULL,
    id_mesa integer,
    id_usuario integer,
    fecha timestamp without time zone,
    estado_pedido boolean,
    estados_p boolean
);
    DROP TABLE public.pedidos;
       public         heap    postgres    false            �            1259    16548    pedidos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pedidos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.pedidos_id_seq;
       public          postgres    false    227            ~           0    0    pedidos_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.pedidos_id_seq OWNED BY public.pedidos.id;
          public          postgres    false    228            �            1259    16549    pedidos_por_mesa    TABLE       CREATE TABLE public.pedidos_por_mesa (
    id integer NOT NULL,
    id_pedido integer,
    id_plato integer,
    cantidad integer,
    id_categoria integer,
    comentarios character varying(255),
    fecha_hora timestamp without time zone,
    id_inventario integer
);
 $   DROP TABLE public.pedidos_por_mesa;
       public         heap    postgres    false            �            1259    16552    pedidos_por_mesa_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pedidos_por_mesa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.pedidos_por_mesa_id_seq;
       public          postgres    false    229                       0    0    pedidos_por_mesa_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.pedidos_por_mesa_id_seq OWNED BY public.pedidos_por_mesa.id;
          public          postgres    false    230            �            1259    16553    platos    TABLE     �   CREATE TABLE public.platos (
    id integer NOT NULL,
    id_categoria integer,
    nombre character varying(100),
    precio integer,
    ruta character varying(255)
);
    DROP TABLE public.platos;
       public         heap    postgres    false            �            1259    16556    platos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.platos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.platos_id_seq;
       public          postgres    false    231            �           0    0    platos_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.platos_id_seq OWNED BY public.platos.id;
          public          postgres    false    232            �            1259    16557    platos_ingredientes    TABLE     �   CREATE TABLE public.platos_ingredientes (
    id integer NOT NULL,
    id_plato integer,
    id_ingredientes integer,
    cantidad numeric(10,2)
);
 '   DROP TABLE public.platos_ingredientes;
       public         heap    postgres    false            �            1259    16560    platos_ingredientes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.platos_ingredientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.platos_ingredientes_id_seq;
       public          postgres    false    233            �           0    0    platos_ingredientes_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.platos_ingredientes_id_seq OWNED BY public.platos_ingredientes.id;
          public          postgres    false    234            �            1259    16561    sesiones_usuarios    TABLE     �   CREATE TABLE public.sesiones_usuarios (
    id integer NOT NULL,
    hora timestamp without time zone,
    id_usuario integer
);
 %   DROP TABLE public.sesiones_usuarios;
       public         heap    postgres    false            �            1259    16564    sesiones_usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sesiones_usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.sesiones_usuarios_id_seq;
       public          postgres    false    235            �           0    0    sesiones_usuarios_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.sesiones_usuarios_id_seq OWNED BY public.sesiones_usuarios.id;
          public          postgres    false    236            �            1259    16565    tipos_de_usuario    TABLE     i   CREATE TABLE public.tipos_de_usuario (
    id integer NOT NULL,
    nombre_tipo character varying(50)
);
 $   DROP TABLE public.tipos_de_usuario;
       public         heap    postgres    false            �            1259    16568    tipos_de_usuario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tipos_de_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.tipos_de_usuario_id_seq;
       public          postgres    false    237            �           0    0    tipos_de_usuario_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.tipos_de_usuario_id_seq OWNED BY public.tipos_de_usuario.id;
          public          postgres    false    238            �            1259    16569    usuarios    TABLE     9  CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre_completo character varying(100),
    cedula character varying(20),
    contrasena character varying(100),
    correo character varying(100),
    telefono character varying(15),
    direccion character varying(255),
    id_tipo_usuario integer
);
    DROP TABLE public.usuarios;
       public         heap    postgres    false            �            1259    16574    usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public          postgres    false    239            �           0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public          postgres    false    240            �           2604    16575    categorias_inventario id    DEFAULT     �   ALTER TABLE ONLY public.categorias_inventario ALTER COLUMN id SET DEFAULT nextval('public.categorias_inventario_id_seq'::regclass);
 G   ALTER TABLE public.categorias_inventario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            �           2604    16576    categorias_platos id    DEFAULT     |   ALTER TABLE ONLY public.categorias_platos ALTER COLUMN id SET DEFAULT nextval('public.categorias_platos_id_seq'::regclass);
 C   ALTER TABLE public.categorias_platos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            �           2604    16577    facturas id    DEFAULT     j   ALTER TABLE ONLY public.facturas ALTER COLUMN id SET DEFAULT nextval('public.facturas_id_seq'::regclass);
 :   ALTER TABLE public.facturas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219            �           2604    16578    ingredientes id    DEFAULT     r   ALTER TABLE ONLY public.ingredientes ALTER COLUMN id SET DEFAULT nextval('public.ingredientes_id_seq'::regclass);
 >   ALTER TABLE public.ingredientes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221            �           2604    16579    inventario id    DEFAULT     n   ALTER TABLE ONLY public.inventario ALTER COLUMN id SET DEFAULT nextval('public.inventario_id_seq'::regclass);
 <   ALTER TABLE public.inventario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223            �           2604    16580    mesas id    DEFAULT     d   ALTER TABLE ONLY public.mesas ALTER COLUMN id SET DEFAULT nextval('public.mesas_id_seq'::regclass);
 7   ALTER TABLE public.mesas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225            �           2604    16581 
   pedidos id    DEFAULT     h   ALTER TABLE ONLY public.pedidos ALTER COLUMN id SET DEFAULT nextval('public.pedidos_id_seq'::regclass);
 9   ALTER TABLE public.pedidos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227            �           2604    16582    pedidos_por_mesa id    DEFAULT     z   ALTER TABLE ONLY public.pedidos_por_mesa ALTER COLUMN id SET DEFAULT nextval('public.pedidos_por_mesa_id_seq'::regclass);
 B   ALTER TABLE public.pedidos_por_mesa ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229            �           2604    16583 	   platos id    DEFAULT     f   ALTER TABLE ONLY public.platos ALTER COLUMN id SET DEFAULT nextval('public.platos_id_seq'::regclass);
 8   ALTER TABLE public.platos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231            �           2604    16584    platos_ingredientes id    DEFAULT     �   ALTER TABLE ONLY public.platos_ingredientes ALTER COLUMN id SET DEFAULT nextval('public.platos_ingredientes_id_seq'::regclass);
 E   ALTER TABLE public.platos_ingredientes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    233            �           2604    16585    sesiones_usuarios id    DEFAULT     |   ALTER TABLE ONLY public.sesiones_usuarios ALTER COLUMN id SET DEFAULT nextval('public.sesiones_usuarios_id_seq'::regclass);
 C   ALTER TABLE public.sesiones_usuarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    235            �           2604    16586    tipos_de_usuario id    DEFAULT     z   ALTER TABLE ONLY public.tipos_de_usuario ALTER COLUMN id SET DEFAULT nextval('public.tipos_de_usuario_id_seq'::regclass);
 B   ALTER TABLE public.tipos_de_usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    238    237            �           2604    16587    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    240    239            q          0    24882    SequelizeMeta 
   TABLE DATA           /   COPY public."SequelizeMeta" (name) FROM stdin;
    public          postgres    false    241   8�       W          0    16521    categorias_inventario 
   TABLE DATA           M   COPY public.categorias_inventario (id, nombre_categoria, estado) FROM stdin;
    public          postgres    false    215   s�       Y          0    16525    categorias_platos 
   TABLE DATA           I   COPY public.categorias_platos (id, nombre_categoria, estado) FROM stdin;
    public          postgres    false    217   ��       [          0    16529    facturas 
   TABLE DATA           G   COPY public.facturas (id, numero, total, fecha, id_pedido) FROM stdin;
    public          postgres    false    219   �       ]          0    16533    ingredientes 
   TABLE DATA           :   COPY public.ingredientes (id, nombre, unidad) FROM stdin;
    public          postgres    false    221   �       _          0    16537 
   inventario 
   TABLE DATA           r   COPY public.inventario (id, cantidad, fecha_ingreso, fecha_vencimiento, id_categoria, id_ingrediente) FROM stdin;
    public          postgres    false    223   p�       a          0    16541    mesas 
   TABLE DATA           3   COPY public.mesas (id, numero, estado) FROM stdin;
    public          postgres    false    225   ��       c          0    16545    pedidos 
   TABLE DATA           [   COPY public.pedidos (id, id_mesa, id_usuario, fecha, estado_pedido, estados_p) FROM stdin;
    public          postgres    false    227   �       e          0    16549    pedidos_por_mesa 
   TABLE DATA           �   COPY public.pedidos_por_mesa (id, id_pedido, id_plato, cantidad, id_categoria, comentarios, fecha_hora, id_inventario) FROM stdin;
    public          postgres    false    229   b�       g          0    16553    platos 
   TABLE DATA           H   COPY public.platos (id, id_categoria, nombre, precio, ruta) FROM stdin;
    public          postgres    false    231   ̇       i          0    16557    platos_ingredientes 
   TABLE DATA           V   COPY public.platos_ingredientes (id, id_plato, id_ingredientes, cantidad) FROM stdin;
    public          postgres    false    233   �       k          0    16561    sesiones_usuarios 
   TABLE DATA           A   COPY public.sesiones_usuarios (id, hora, id_usuario) FROM stdin;
    public          postgres    false    235   G�       m          0    16565    tipos_de_usuario 
   TABLE DATA           ;   COPY public.tipos_de_usuario (id, nombre_tipo) FROM stdin;
    public          postgres    false    237   x�       o          0    16569    usuarios 
   TABLE DATA           y   COPY public.usuarios (id, nombre_completo, cedula, contrasena, correo, telefono, direccion, id_tipo_usuario) FROM stdin;
    public          postgres    false    239   ��       �           0    0    categorias_inventario_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.categorias_inventario_id_seq', 21, true);
          public          postgres    false    216            �           0    0    categorias_platos_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.categorias_platos_id_seq', 6, true);
          public          postgres    false    218            �           0    0    facturas_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.facturas_id_seq', 1, false);
          public          postgres    false    220            �           0    0    ingredientes_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.ingredientes_id_seq', 8, true);
          public          postgres    false    222            �           0    0    inventario_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.inventario_id_seq', 3, true);
          public          postgres    false    224            �           0    0    mesas_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.mesas_id_seq', 19, true);
          public          postgres    false    226            �           0    0    pedidos_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.pedidos_id_seq', 20, true);
          public          postgres    false    228            �           0    0    pedidos_por_mesa_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.pedidos_por_mesa_id_seq', 14, true);
          public          postgres    false    230            �           0    0    platos_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.platos_id_seq', 8, true);
          public          postgres    false    232            �           0    0    platos_ingredientes_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.platos_ingredientes_id_seq', 44, true);
          public          postgres    false    234            �           0    0    sesiones_usuarios_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.sesiones_usuarios_id_seq', 29, true);
          public          postgres    false    236            �           0    0    tipos_de_usuario_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.tipos_de_usuario_id_seq', 5, true);
          public          postgres    false    238            �           0    0    usuarios_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.usuarios_id_seq', 11, true);
          public          postgres    false    240            �           2606    24886     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public            postgres    false    241            �           2606    16589 0   categorias_inventario categorias_inventario_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.categorias_inventario
    ADD CONSTRAINT categorias_inventario_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.categorias_inventario DROP CONSTRAINT categorias_inventario_pkey;
       public            postgres    false    215            �           2606    16591 (   categorias_platos categorias_platos_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.categorias_platos
    ADD CONSTRAINT categorias_platos_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.categorias_platos DROP CONSTRAINT categorias_platos_pkey;
       public            postgres    false    217            �           2606    16593    facturas facturas_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT facturas_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.facturas DROP CONSTRAINT facturas_pkey;
       public            postgres    false    219            �           2606    16595    ingredientes ingredientes_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.ingredientes
    ADD CONSTRAINT ingredientes_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.ingredientes DROP CONSTRAINT ingredientes_pkey;
       public            postgres    false    221            �           2606    16597    inventario inventario_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT inventario_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.inventario DROP CONSTRAINT inventario_pkey;
       public            postgres    false    223            �           2606    16599    mesas mesas_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.mesas
    ADD CONSTRAINT mesas_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.mesas DROP CONSTRAINT mesas_pkey;
       public            postgres    false    225            �           2606    16601    pedidos pedidos_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.pedidos DROP CONSTRAINT pedidos_pkey;
       public            postgres    false    227            �           2606    16603 &   pedidos_por_mesa pedidos_por_mesa_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.pedidos_por_mesa
    ADD CONSTRAINT pedidos_por_mesa_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.pedidos_por_mesa DROP CONSTRAINT pedidos_por_mesa_pkey;
       public            postgres    false    229            �           2606    16605 ,   platos_ingredientes platos_ingredientes_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.platos_ingredientes
    ADD CONSTRAINT platos_ingredientes_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.platos_ingredientes DROP CONSTRAINT platos_ingredientes_pkey;
       public            postgres    false    233            �           2606    16607    platos platos_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.platos
    ADD CONSTRAINT platos_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.platos DROP CONSTRAINT platos_pkey;
       public            postgres    false    231            �           2606    16609 (   sesiones_usuarios sesiones_usuarios_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.sesiones_usuarios
    ADD CONSTRAINT sesiones_usuarios_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.sesiones_usuarios DROP CONSTRAINT sesiones_usuarios_pkey;
       public            postgres    false    235            �           2606    16611 &   tipos_de_usuario tipos_de_usuario_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.tipos_de_usuario
    ADD CONSTRAINT tipos_de_usuario_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.tipos_de_usuario DROP CONSTRAINT tipos_de_usuario_pkey;
       public            postgres    false    237            �           2606    16613    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            postgres    false    239            �           1259    16684 "   fki_inventario_id_ingrediente_fkey    INDEX     c   CREATE INDEX fki_inventario_id_ingrediente_fkey ON public.inventario USING btree (id_ingrediente);
 6   DROP INDEX public.fki_inventario_id_ingrediente_fkey;
       public            postgres    false    223            �           2606    24887    facturas id_pedido_fkey    FK CONSTRAINT     z   ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT id_pedido_fkey FOREIGN KEY (id_pedido) REFERENCES public.pedidos(id);
 A   ALTER TABLE ONLY public.facturas DROP CONSTRAINT id_pedido_fkey;
       public          postgres    false    219    4779    227            �           2606    16619 '   inventario inventario_id_categoria_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT inventario_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categorias_inventario(id);
 Q   ALTER TABLE ONLY public.inventario DROP CONSTRAINT inventario_id_categoria_fkey;
       public          postgres    false    215    223    4766            �           2606    16679 )   inventario inventario_id_ingrediente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT inventario_id_ingrediente_fkey FOREIGN KEY (id_ingrediente) REFERENCES public.ingredientes(id);
 S   ALTER TABLE ONLY public.inventario DROP CONSTRAINT inventario_id_ingrediente_fkey;
       public          postgres    false    221    4772    223            �           2606    16629    pedidos pedidos_id_mesa_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_id_mesa_fkey FOREIGN KEY (id_mesa) REFERENCES public.mesas(id);
 F   ALTER TABLE ONLY public.pedidos DROP CONSTRAINT pedidos_id_mesa_fkey;
       public          postgres    false    225    4777    227            �           2606    16634    pedidos pedidos_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id);
 I   ALTER TABLE ONLY public.pedidos DROP CONSTRAINT pedidos_id_usuario_fkey;
       public          postgres    false    239    4791    227            �           2606    16685 3   pedidos_por_mesa pedidos_por_mesa_id_categoria_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedidos_por_mesa
    ADD CONSTRAINT pedidos_por_mesa_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categorias_platos(id);
 ]   ALTER TABLE ONLY public.pedidos_por_mesa DROP CONSTRAINT pedidos_por_mesa_id_categoria_fkey;
       public          postgres    false    4768    229    217            �           2606    16639 4   pedidos_por_mesa pedidos_por_mesa_id_inventario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedidos_por_mesa
    ADD CONSTRAINT pedidos_por_mesa_id_inventario_fkey FOREIGN KEY (id_inventario) REFERENCES public.inventario(id);
 ^   ALTER TABLE ONLY public.pedidos_por_mesa DROP CONSTRAINT pedidos_por_mesa_id_inventario_fkey;
       public          postgres    false    4775    229    223            �           2606    16644 0   pedidos_por_mesa pedidos_por_mesa_id_pedido_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedidos_por_mesa
    ADD CONSTRAINT pedidos_por_mesa_id_pedido_fkey FOREIGN KEY (id_pedido) REFERENCES public.pedidos(id);
 Z   ALTER TABLE ONLY public.pedidos_por_mesa DROP CONSTRAINT pedidos_por_mesa_id_pedido_fkey;
       public          postgres    false    4779    227    229            �           2606    16649 /   pedidos_por_mesa pedidos_por_mesa_id_plato_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedidos_por_mesa
    ADD CONSTRAINT pedidos_por_mesa_id_plato_fkey FOREIGN KEY (id_plato) REFERENCES public.platos(id);
 Y   ALTER TABLE ONLY public.pedidos_por_mesa DROP CONSTRAINT pedidos_por_mesa_id_plato_fkey;
       public          postgres    false    229    231    4783            �           2606    16654    platos platos_id_categoria_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.platos
    ADD CONSTRAINT platos_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categorias_platos(id);
 I   ALTER TABLE ONLY public.platos DROP CONSTRAINT platos_id_categoria_fkey;
       public          postgres    false    231    217    4768            �           2606    16659 <   platos_ingredientes platos_ingredientes_id_ingredientes_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.platos_ingredientes
    ADD CONSTRAINT platos_ingredientes_id_ingredientes_fkey FOREIGN KEY (id_ingredientes) REFERENCES public.ingredientes(id);
 f   ALTER TABLE ONLY public.platos_ingredientes DROP CONSTRAINT platos_ingredientes_id_ingredientes_fkey;
       public          postgres    false    221    4772    233            �           2606    16664 5   platos_ingredientes platos_ingredientes_id_plato_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.platos_ingredientes
    ADD CONSTRAINT platos_ingredientes_id_plato_fkey FOREIGN KEY (id_plato) REFERENCES public.platos(id);
 _   ALTER TABLE ONLY public.platos_ingredientes DROP CONSTRAINT platos_ingredientes_id_plato_fkey;
       public          postgres    false    4783    231    233            �           2606    16669 3   sesiones_usuarios sesiones_usuarios_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sesiones_usuarios
    ADD CONSTRAINT sesiones_usuarios_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id);
 ]   ALTER TABLE ONLY public.sesiones_usuarios DROP CONSTRAINT sesiones_usuarios_id_usuario_fkey;
       public          postgres    false    4791    235    239            �           2606    16674 &   usuarios usuarios_id_tipo_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_id_tipo_usuario_fkey FOREIGN KEY (id_tipo_usuario) REFERENCES public.tipos_de_usuario(id);
 P   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_id_tipo_usuario_fkey;
       public          postgres    false    4789    239    237            q   +   x�3202140250B���ĒT݂�Ē�b��b�=... �J	�      W   .   x�34��*M��L�22�(*MMJ,.�,���<�1Ȋ���� �,
�      Y   @   x�3�H-J,�L�2�(*MMJ�,�2��*M��sdޘd�p�&攤&� Ֆp��qqq �k\      [      x������ � �      ]   B   x�3�tN,�K�4�2���/J�44�2�t�*MN,�4�2��<�1�ӄ˂�95)?'�+F��� �1�      _   6   x�3�446�4202�54�5@0M9-9���8ab���朆�&\1z\\\ ��      a   <   x�3�44�,)*M�2�44��,8!,��9�e�i	aYr�@�,8-8�s�S�b���� ְo      c   P   x�]��� �3L�>�U�����i㭽�<
Z7�ZThu-f��˄Ӧ͘?����&�8Ɣ��w�$�Y��� �      e   Z   x�m��� F�s�� �K[�C��������˃6�2:��$,Z��q	ma^G7�{B#�_���������k��kܫ��r֔�c$      g   1   x�3�4��H�M*-J/M-N�44200���� J�$&�sAb���� #
�      i   *   x�34�4�4�42�30�21r�8M�lc ۂ�Ď���� ��      k   !  x�e��q�PC��*��2 �>�e��#��$k���@����_ؗx�6��c�hLv� 7$�O�!�ilKfL�ʁ�!F.��?Y�TZ���&�̝+iH훍���t�c��3�(͹�s?`:�23QC��!���SE:�=_��h�~��R;D`�!u�X�3,�S-�7��y�rt(a�R��0q���gB������7T#�
��K���@:-g6�|��p'�e����+h����Joi$\�h�Vv�p�g>�o�Ì����{�#� ��F��ޛ����וb      m   3   x�3�tL����,.)JL�/�2��M-N-��2�t�HM�2�tN��c���� T�G      o   �   x�}̱
�P����a�InE7�usu	Z�b��-��on�J��lq��z�eʯ�c�Gw�d�..M�YT�0�q
B�)�X����+m�,�P�߶�a!�5x_�������>-�dI炈^�`B*     