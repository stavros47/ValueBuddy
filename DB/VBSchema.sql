--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-1.pgdg18.04+1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-1.pgdg18.04+1)

-- Started on 2019-10-01 18:00:31 EEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3120 (class 1262 OID 16422)
-- Name: ValueBuddyDB; Type: DATABASE; Schema: -; Owner: stavros
--

CREATE DATABASE "ValueBuddyDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE "ValueBuddyDB" OWNER TO stavros;

\connect "ValueBuddyDB"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 13043)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 3122 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- TOC entry 203 (class 1259 OID 16457)
-- Name: cities; Type: TABLE; Schema: public; Owner: stavros
--

CREATE TABLE public.cities (
    id integer NOT NULL,
    city character varying(30) NOT NULL
);


ALTER TABLE public.cities OWNER TO stavros;

--
-- TOC entry 202 (class 1259 OID 16455)
-- Name: Cities_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public."Cities_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Cities_id_seq" OWNER TO stavros;

--
-- TOC entry 3123 (class 0 OID 0)
-- Dependencies: 202
-- Name: Cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public."Cities_id_seq" OWNED BY public.cities.id;


--
-- TOC entry 229 (class 1259 OID 16605)
-- Name: coupons; Type: TABLE; Schema: public; Owner: stavros
--

CREATE TABLE public.coupons (
    coupon_id integer NOT NULL,
    code character varying(44) NOT NULL,
    customer_id integer NOT NULL,
    batch_id integer NOT NULL,
    is_redeemed boolean NOT NULL,
    date_claimed date NOT NULL,
    date_used date,
    redeemed_discount integer,
    purchased_item character varying(30)
);


ALTER TABLE public.coupons OWNER TO stavros;

--
-- TOC entry 228 (class 1259 OID 16603)
-- Name: Coupon_batch_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public."Coupon_batch_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Coupon_batch_id_seq" OWNER TO stavros;

--
-- TOC entry 3124 (class 0 OID 0)
-- Dependencies: 228
-- Name: Coupon_batch_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public."Coupon_batch_id_seq" OWNED BY public.coupons.batch_id;


--
-- TOC entry 226 (class 1259 OID 16599)
-- Name: Coupon_coupon_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public."Coupon_coupon_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Coupon_coupon_id_seq" OWNER TO stavros;

--
-- TOC entry 3125 (class 0 OID 0)
-- Dependencies: 226
-- Name: Coupon_coupon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public."Coupon_coupon_id_seq" OWNED BY public.coupons.coupon_id;


--
-- TOC entry 227 (class 1259 OID 16601)
-- Name: Coupon_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public."Coupon_customer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Coupon_customer_id_seq" OWNER TO stavros;

--
-- TOC entry 3126 (class 0 OID 0)
-- Dependencies: 227
-- Name: Coupon_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public."Coupon_customer_id_seq" OWNED BY public.coupons.customer_id;


--
-- TOC entry 201 (class 1259 OID 16447)
-- Name: address; Type: TABLE; Schema: public; Owner: stavros
--

CREATE TABLE public.address (
    address_id integer NOT NULL,
    address1 character varying(30) NOT NULL,
    address2 character varying(20),
    zip character varying(7),
    city_id integer NOT NULL,
    country_id integer NOT NULL
);


ALTER TABLE public.address OWNER TO stavros;

--
-- TOC entry 198 (class 1259 OID 16441)
-- Name: address_address_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public.address_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.address_address_id_seq OWNER TO stavros;

--
-- TOC entry 3127 (class 0 OID 0)
-- Dependencies: 198
-- Name: address_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public.address_address_id_seq OWNED BY public.address.address_id;


--
-- TOC entry 199 (class 1259 OID 16443)
-- Name: address_city_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public.address_city_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.address_city_id_seq OWNER TO stavros;

--
-- TOC entry 3128 (class 0 OID 0)
-- Dependencies: 199
-- Name: address_city_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public.address_city_id_seq OWNED BY public.address.city_id;


--
-- TOC entry 200 (class 1259 OID 16445)
-- Name: address_country_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public.address_country_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.address_country_id_seq OWNER TO stavros;

--
-- TOC entry 3129 (class 0 OID 0)
-- Dependencies: 200
-- Name: address_country_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public.address_country_id_seq OWNED BY public.address.country_id;


--
-- TOC entry 225 (class 1259 OID 16587)
-- Name: batch; Type: TABLE; Schema: public; Owner: stavros
--

CREATE TABLE public.batch (
    batch_id integer NOT NULL,
    template_id integer NOT NULL,
    created_count integer NOT NULL,
    claimed_count integer NOT NULL,
    redeemed_count integer NOT NULL,
    start_date date NOT NULL,
    expiry_date date NOT NULL,
    status_id integer NOT NULL,
    date_created date
);


ALTER TABLE public.batch OWNER TO stavros;

--
-- TOC entry 223 (class 1259 OID 16583)
-- Name: batch_batch_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public.batch_batch_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.batch_batch_id_seq OWNER TO stavros;

--
-- TOC entry 3130 (class 0 OID 0)
-- Dependencies: 223
-- Name: batch_batch_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public.batch_batch_id_seq OWNED BY public.batch.batch_id;


--
-- TOC entry 230 (class 1259 OID 16623)
-- Name: batch_status_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public.batch_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.batch_status_id_seq OWNER TO stavros;

--
-- TOC entry 3131 (class 0 OID 0)
-- Dependencies: 230
-- Name: batch_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public.batch_status_id_seq OWNED BY public.batch.status_id;


--
-- TOC entry 224 (class 1259 OID 16585)
-- Name: batch_template_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public.batch_template_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.batch_template_id_seq OWNER TO stavros;

--
-- TOC entry 3132 (class 0 OID 0)
-- Dependencies: 224
-- Name: batch_template_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public.batch_template_id_seq OWNED BY public.batch.template_id;


--
-- TOC entry 218 (class 1259 OID 16527)
-- Name: business; Type: TABLE; Schema: public; Owner: stavros
--

CREATE TABLE public.business (
    business_id integer NOT NULL,
    business_name character varying(40) NOT NULL,
    type_id integer NOT NULL,
    website_url character varying(40),
    phone_number character varying(20),
    address_id integer NOT NULL,
    about character varying(60),
    user_id integer NOT NULL
);


ALTER TABLE public.business OWNER TO stavros;

--
-- TOC entry 217 (class 1259 OID 16525)
-- Name: business_address_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public.business_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.business_address_id_seq OWNER TO stavros;

--
-- TOC entry 3133 (class 0 OID 0)
-- Dependencies: 217
-- Name: business_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public.business_address_id_seq OWNED BY public.business.address_id;


--
-- TOC entry 215 (class 1259 OID 16521)
-- Name: business_business_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public.business_business_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.business_business_id_seq OWNER TO stavros;

--
-- TOC entry 3134 (class 0 OID 0)
-- Dependencies: 215
-- Name: business_business_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public.business_business_id_seq OWNED BY public.business.business_id;


--
-- TOC entry 216 (class 1259 OID 16523)
-- Name: business_type_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public.business_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.business_type_id_seq OWNER TO stavros;

--
-- TOC entry 3135 (class 0 OID 0)
-- Dependencies: 216
-- Name: business_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public.business_type_id_seq OWNED BY public.business.type_id;


--
-- TOC entry 214 (class 1259 OID 16515)
-- Name: business_types; Type: TABLE; Schema: public; Owner: stavros
--

CREATE TABLE public.business_types (
    type_id integer NOT NULL,
    type character varying(30) NOT NULL
);


ALTER TABLE public.business_types OWNER TO stavros;

--
-- TOC entry 213 (class 1259 OID 16513)
-- Name: business_types_type_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public.business_types_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.business_types_type_id_seq OWNER TO stavros;

--
-- TOC entry 3136 (class 0 OID 0)
-- Dependencies: 213
-- Name: business_types_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public.business_types_type_id_seq OWNED BY public.business_types.type_id;


--
-- TOC entry 205 (class 1259 OID 16465)
-- Name: countries; Type: TABLE; Schema: public; Owner: stavros
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    country character varying(30) NOT NULL
);


ALTER TABLE public.countries OWNER TO stavros;

--
-- TOC entry 204 (class 1259 OID 16463)
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public.countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.countries_id_seq OWNER TO stavros;

--
-- TOC entry 3137 (class 0 OID 0)
-- Dependencies: 204
-- Name: countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public.countries_id_seq OWNED BY public.countries.id;


--
-- TOC entry 212 (class 1259 OID 16507)
-- Name: coupon_status; Type: TABLE; Schema: public; Owner: stavros
--

CREATE TABLE public.coupon_status (
    status_id integer NOT NULL,
    status character varying(20) NOT NULL
);


ALTER TABLE public.coupon_status OWNER TO stavros;

--
-- TOC entry 211 (class 1259 OID 16505)
-- Name: coupon_status_status_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public.coupon_status_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.coupon_status_status_id_seq OWNER TO stavros;

--
-- TOC entry 3138 (class 0 OID 0)
-- Dependencies: 211
-- Name: coupon_status_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public.coupon_status_status_id_seq OWNED BY public.coupon_status.status_id;


--
-- TOC entry 208 (class 1259 OID 16485)
-- Name: customer; Type: TABLE; Schema: public; Owner: stavros
--

CREATE TABLE public.customer (
    customer_id integer NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30),
    gender character varying(7),
    date_of_birth date NOT NULL,
    phone_number character varying(20),
    address_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.customer OWNER TO stavros;

--
-- TOC entry 207 (class 1259 OID 16483)
-- Name: customer_address_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public.customer_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customer_address_id_seq OWNER TO stavros;

--
-- TOC entry 3139 (class 0 OID 0)
-- Dependencies: 207
-- Name: customer_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public.customer_address_id_seq OWNED BY public.customer.address_id;


--
-- TOC entry 206 (class 1259 OID 16481)
-- Name: customer_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public.customer_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customer_customer_id_seq OWNER TO stavros;

--
-- TOC entry 3140 (class 0 OID 0)
-- Dependencies: 206
-- Name: customer_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public.customer_customer_id_seq OWNED BY public.customer.customer_id;


--
-- TOC entry 231 (class 1259 OID 17023)
-- Name: diffmonths; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.diffmonths (
);


ALTER TABLE public.diffmonths OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16499)
-- Name: discount_types; Type: TABLE; Schema: public; Owner: stavros
--

CREATE TABLE public.discount_types (
    type_id integer NOT NULL,
    type character varying(25) NOT NULL
);


ALTER TABLE public.discount_types OWNER TO stavros;

--
-- TOC entry 209 (class 1259 OID 16497)
-- Name: discount_types_type_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public.discount_types_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_types_type_id_seq OWNER TO stavros;

--
-- TOC entry 3141 (class 0 OID 0)
-- Dependencies: 209
-- Name: discount_types_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public.discount_types_type_id_seq OWNED BY public.discount_types.type_id;


--
-- TOC entry 222 (class 1259 OID 16558)
-- Name: templates; Type: TABLE; Schema: public; Owner: stavros
--

CREATE TABLE public.templates (
    template_id integer NOT NULL,
    business_id integer NOT NULL,
    description character varying(60) NOT NULL,
    discount_type integer NOT NULL,
    discount integer NOT NULL,
    create_date date NOT NULL,
    delete_date date
);


ALTER TABLE public.templates OWNER TO stavros;

--
-- TOC entry 3142 (class 0 OID 0)
-- Dependencies: 222
-- Name: TABLE templates; Type: COMMENT; Schema: public; Owner: stavros
--

COMMENT ON TABLE public.templates IS 'coupon templates';


--
-- TOC entry 220 (class 1259 OID 16552)
-- Name: templates_business_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public.templates_business_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.templates_business_id_seq OWNER TO stavros;

--
-- TOC entry 3143 (class 0 OID 0)
-- Dependencies: 220
-- Name: templates_business_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public.templates_business_id_seq OWNED BY public.templates.business_id;


--
-- TOC entry 221 (class 1259 OID 16554)
-- Name: templates_discount_type_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public.templates_discount_type_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.templates_discount_type_seq OWNER TO stavros;

--
-- TOC entry 3144 (class 0 OID 0)
-- Dependencies: 221
-- Name: templates_discount_type_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public.templates_discount_type_seq OWNED BY public.templates.discount_type;


--
-- TOC entry 219 (class 1259 OID 16550)
-- Name: templates_template_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public.templates_template_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.templates_template_id_seq OWNER TO stavros;

--
-- TOC entry 3145 (class 0 OID 0)
-- Dependencies: 219
-- Name: templates_template_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public.templates_template_id_seq OWNED BY public.templates.template_id;


--
-- TOC entry 197 (class 1259 OID 16433)
-- Name: users; Type: TABLE; Schema: public; Owner: stavros
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    password character varying(80) NOT NULL,
    create_date date NOT NULL,
    delete_date date,
    last_seen_date date NOT NULL,
    email character varying(50)
);


ALTER TABLE public.users OWNER TO stavros;

--
-- TOC entry 196 (class 1259 OID 16431)
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: stavros
--

CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_user_id_seq OWNER TO stavros;

--
-- TOC entry 3146 (class 0 OID 0)
-- Dependencies: 196
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stavros
--

ALTER SEQUENCE public.user_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 2929 (class 2604 OID 16450)
-- Name: address address_id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.address ALTER COLUMN address_id SET DEFAULT nextval('public.address_address_id_seq'::regclass);


--
-- TOC entry 2930 (class 2604 OID 16451)
-- Name: address city_id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.address ALTER COLUMN city_id SET DEFAULT nextval('public.address_city_id_seq'::regclass);


--
-- TOC entry 2931 (class 2604 OID 16452)
-- Name: address country_id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.address ALTER COLUMN country_id SET DEFAULT nextval('public.address_country_id_seq'::regclass);


--
-- TOC entry 2945 (class 2604 OID 16590)
-- Name: batch batch_id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.batch ALTER COLUMN batch_id SET DEFAULT nextval('public.batch_batch_id_seq'::regclass);


--
-- TOC entry 2946 (class 2604 OID 16591)
-- Name: batch template_id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.batch ALTER COLUMN template_id SET DEFAULT nextval('public.batch_template_id_seq'::regclass);


--
-- TOC entry 2947 (class 2604 OID 16625)
-- Name: batch status_id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.batch ALTER COLUMN status_id SET DEFAULT nextval('public.batch_status_id_seq'::regclass);


--
-- TOC entry 2939 (class 2604 OID 16530)
-- Name: business business_id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.business ALTER COLUMN business_id SET DEFAULT nextval('public.business_business_id_seq'::regclass);


--
-- TOC entry 2940 (class 2604 OID 16531)
-- Name: business type_id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.business ALTER COLUMN type_id SET DEFAULT nextval('public.business_type_id_seq'::regclass);


--
-- TOC entry 2941 (class 2604 OID 16532)
-- Name: business address_id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.business ALTER COLUMN address_id SET DEFAULT nextval('public.business_address_id_seq'::regclass);


--
-- TOC entry 2938 (class 2604 OID 16518)
-- Name: business_types type_id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.business_types ALTER COLUMN type_id SET DEFAULT nextval('public.business_types_type_id_seq'::regclass);


--
-- TOC entry 2932 (class 2604 OID 16460)
-- Name: cities id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.cities ALTER COLUMN id SET DEFAULT nextval('public."Cities_id_seq"'::regclass);


--
-- TOC entry 2933 (class 2604 OID 16468)
-- Name: countries id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.countries ALTER COLUMN id SET DEFAULT nextval('public.countries_id_seq'::regclass);


--
-- TOC entry 2937 (class 2604 OID 16510)
-- Name: coupon_status status_id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.coupon_status ALTER COLUMN status_id SET DEFAULT nextval('public.coupon_status_status_id_seq'::regclass);


--
-- TOC entry 2948 (class 2604 OID 16608)
-- Name: coupons coupon_id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.coupons ALTER COLUMN coupon_id SET DEFAULT nextval('public."Coupon_coupon_id_seq"'::regclass);


--
-- TOC entry 2949 (class 2604 OID 16609)
-- Name: coupons customer_id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.coupons ALTER COLUMN customer_id SET DEFAULT nextval('public."Coupon_customer_id_seq"'::regclass);


--
-- TOC entry 2950 (class 2604 OID 16610)
-- Name: coupons batch_id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.coupons ALTER COLUMN batch_id SET DEFAULT nextval('public."Coupon_batch_id_seq"'::regclass);


--
-- TOC entry 2934 (class 2604 OID 16488)
-- Name: customer customer_id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.customer ALTER COLUMN customer_id SET DEFAULT nextval('public.customer_customer_id_seq'::regclass);


--
-- TOC entry 2935 (class 2604 OID 16489)
-- Name: customer address_id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.customer ALTER COLUMN address_id SET DEFAULT nextval('public.customer_address_id_seq'::regclass);


--
-- TOC entry 2936 (class 2604 OID 16502)
-- Name: discount_types type_id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.discount_types ALTER COLUMN type_id SET DEFAULT nextval('public.discount_types_type_id_seq'::regclass);


--
-- TOC entry 2942 (class 2604 OID 16561)
-- Name: templates template_id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.templates ALTER COLUMN template_id SET DEFAULT nextval('public.templates_template_id_seq'::regclass);


--
-- TOC entry 2943 (class 2604 OID 16562)
-- Name: templates business_id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.templates ALTER COLUMN business_id SET DEFAULT nextval('public.templates_business_id_seq'::regclass);


--
-- TOC entry 2944 (class 2604 OID 16563)
-- Name: templates discount_type; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.templates ALTER COLUMN discount_type SET DEFAULT nextval('public.templates_discount_type_seq'::regclass);


--
-- TOC entry 2928 (class 2604 OID 16436)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- TOC entry 2958 (class 2606 OID 16462)
-- Name: cities Cities_pkey; Type: CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT "Cities_pkey" PRIMARY KEY (id);


--
-- TOC entry 2980 (class 2606 OID 16612)
-- Name: coupons Coupon_pkey; Type: CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT "Coupon_pkey" PRIMARY KEY (coupon_id);


--
-- TOC entry 2956 (class 2606 OID 16454)
-- Name: address address_pkey; Type: CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (address_id);


--
-- TOC entry 2978 (class 2606 OID 16593)
-- Name: batch batch_pkey; Type: CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.batch
    ADD CONSTRAINT batch_pkey PRIMARY KEY (batch_id);


--
-- TOC entry 2972 (class 2606 OID 16534)
-- Name: business business_pkey; Type: CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.business
    ADD CONSTRAINT business_pkey PRIMARY KEY (business_id);


--
-- TOC entry 2970 (class 2606 OID 16520)
-- Name: business_types business_types_pkey; Type: CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.business_types
    ADD CONSTRAINT business_types_pkey PRIMARY KEY (type_id);


--
-- TOC entry 2960 (class 2606 OID 16470)
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- TOC entry 2968 (class 2606 OID 16512)
-- Name: coupon_status coupon_status_pkey; Type: CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.coupon_status
    ADD CONSTRAINT coupon_status_pkey PRIMARY KEY (status_id);


--
-- TOC entry 2962 (class 2606 OID 16491)
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (customer_id);


--
-- TOC entry 2966 (class 2606 OID 16504)
-- Name: discount_types discount_types_pkey; Type: CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.discount_types
    ADD CONSTRAINT discount_types_pkey PRIMARY KEY (type_id);


--
-- TOC entry 2952 (class 2606 OID 16722)
-- Name: users emailUnique; Type: CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "emailUnique" UNIQUE (email);


--
-- TOC entry 2976 (class 2606 OID 16566)
-- Name: templates templates_pkey; Type: CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.templates
    ADD CONSTRAINT templates_pkey PRIMARY KEY (template_id);


--
-- TOC entry 2964 (class 2606 OID 16648)
-- Name: customer user; Type: CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT "user" UNIQUE (user_id);


--
-- TOC entry 2974 (class 2606 OID 16650)
-- Name: business user-id; Type: CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.business
    ADD CONSTRAINT "user-id" UNIQUE (user_id);


--
-- TOC entry 2954 (class 2606 OID 16438)
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2983 (class 2606 OID 16492)
-- Name: customer address; Type: FK CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT address FOREIGN KEY (address_id) REFERENCES public.address(address_id);


--
-- TOC entry 2986 (class 2606 OID 16545)
-- Name: business address; Type: FK CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.business
    ADD CONSTRAINT address FOREIGN KEY (address_id) REFERENCES public.address(address_id);


--
-- TOC entry 2993 (class 2606 OID 16618)
-- Name: coupons batch; Type: FK CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT batch FOREIGN KEY (batch_id) REFERENCES public.batch(batch_id);


--
-- TOC entry 2988 (class 2606 OID 16567)
-- Name: templates business; Type: FK CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.templates
    ADD CONSTRAINT business FOREIGN KEY (business_id) REFERENCES public.business(business_id);


--
-- TOC entry 2985 (class 2606 OID 16540)
-- Name: business business_type; Type: FK CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.business
    ADD CONSTRAINT business_type FOREIGN KEY (type_id) REFERENCES public.business_types(type_id);


--
-- TOC entry 2981 (class 2606 OID 16471)
-- Name: address city; Type: FK CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT city FOREIGN KEY (city_id) REFERENCES public.cities(id);


--
-- TOC entry 2982 (class 2606 OID 16476)
-- Name: address country; Type: FK CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT country FOREIGN KEY (country_id) REFERENCES public.countries(id);


--
-- TOC entry 2992 (class 2606 OID 16613)
-- Name: coupons customer; Type: FK CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT customer FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id);


--
-- TOC entry 2989 (class 2606 OID 16572)
-- Name: templates discount_type; Type: FK CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.templates
    ADD CONSTRAINT discount_type FOREIGN KEY (discount_type) REFERENCES public.discount_types(type_id);


--
-- TOC entry 2991 (class 2606 OID 16630)
-- Name: batch status; Type: FK CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.batch
    ADD CONSTRAINT status FOREIGN KEY (status_id) REFERENCES public.coupon_status(status_id);


--
-- TOC entry 2990 (class 2606 OID 16594)
-- Name: batch template_id; Type: FK CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.batch
    ADD CONSTRAINT template_id FOREIGN KEY (template_id) REFERENCES public.templates(template_id);


--
-- TOC entry 2984 (class 2606 OID 16642)
-- Name: customer user; Type: FK CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT "user" FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 2987 (class 2606 OID 16651)
-- Name: business user; Type: FK CONSTRAINT; Schema: public; Owner: stavros
--

ALTER TABLE ONLY public.business
    ADD CONSTRAINT "user" FOREIGN KEY (user_id) REFERENCES public.users(user_id);

--
-- TOC entry 247 (class 1255 OID 25283)
-- Name: claim_from_batch(integer, integer, integer, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.claim_from_batch(businessid integer, batchid integer, customerid integer, rcode character varying) RETURNS integer
    LANGUAGE plpgsql
    AS $$

DECLARE
	couponBatchID INTEGER;
	newCouponID INTEGER;
BEGIN
	PERFORM update_batch_status();
   /*Check if the batch is available to the customer*/
	SELECT INTO couponBatchID batches.batch_id 
	FROM get_customer_available_batches(customerID) as batches 
	WHERE batches.batch_id = batchID
	AND batches.business_id = businessID;

	IF couponBatchID IS NOT NULL THEN
		RAISE NOTICE 'success';
		INSERT INTO coupons(code,customer_id,batch_id,is_redeemed,date_claimed)
		VALUES(rcode, customerID,batchID,false,NOW())
		RETURNING coupons.coupon_id INTO newCouponID;
		 IF newCouponID IS NOT NULL THEN
		 	RETURN newCouponID;
		 END IF;
	ELSE
		RAISE NOTICE 'failed';
		RETURN -1;
    END IF;
END $$;


ALTER FUNCTION public.claim_from_batch(businessid integer, batchid integer, customerid integer, rcode character varying) OWNER TO postgres;

--
-- TOC entry 268 (class 1255 OID 17022)
-- Name: datediff(character varying, timestamp without time zone, timestamp without time zone); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.datediff(units character varying, start_t timestamp without time zone, end_t timestamp without time zone) RETURNS integer
    LANGUAGE plpgsql
    AS $$
   DECLARE
     diff_interval INTERVAL; 
     diff INT = 0;
     years_diff INT = 0;
   BEGIN
     IF units IN ('yy', 'yyyy', 'year', 'mm', 'm', 'month') THEN
       years_diff = DATE_PART('year', end_t) - DATE_PART('year', start_t);
 
       IF units IN ('yy', 'yyyy', 'year') THEN
         -- SQL Server does not count full years passed (only difference between year parts)
         RETURN years_diff;
       ELSE
         -- If end month is less than start month it will subtracted
         RETURN years_diff * 12 + (DATE_PART('month', end_t) - DATE_PART('month', start_t)); 
       END IF;
     END IF;
 
     -- Minus operator returns interval 'DDD days HH:MI:SS'  
     diff_interval = end_t - start_t;
 
     diff = diff + DATE_PART('day', diff_interval);
 
     IF units IN ('wk', 'ww', 'week') THEN
       diff = diff/7;
       RETURN diff;
     END IF;
 
     IF units IN ('dd', 'd', 'day') THEN
       RETURN diff;
     END IF;
 
     diff = diff * 24 + DATE_PART('hour', diff_interval); 
 
     IF units IN ('hh', 'hour') THEN
        RETURN diff;
     END IF;
 
     diff = diff * 60 + DATE_PART('minute', diff_interval);
 
     IF units IN ('mi', 'n', 'minute') THEN
        RETURN diff;
     END IF;
 
     diff = diff * 60 + DATE_PART('second', diff_interval);
 
     RETURN diff;
   END;
   $$;


ALTER FUNCTION public.datediff(units character varying, start_t timestamp without time zone, end_t timestamp without time zone) OWNER TO postgres;

--
-- TOC entry 232 (class 1255 OID 16735)
-- Name: delete_customer(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.delete_customer(customerid integer) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
DECLARE
	userID INTEGER;

BEGIN
	/*Hold the user id to delete later*/
	SELECT INTO userID  c.user_id FROM customer c WHERE c.customer_id = customerID;
	
	DELETE FROM coupons WHERE coupons.customer_id = customerID;
	
	DELETE FROM customer c WHERE c.customer_id = customerID;
	IF userID IS NOT NULL THEN
		DELETE FROM users WHERE users.user_id = userID;
	END IF;
	  
	RETURN FOUND;
END;
$$;


ALTER FUNCTION public.delete_customer(customerid integer) OWNER TO postgres;

--
-- TOC entry 283 (class 1255 OID 25310)
-- Name: get_batch(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_batch(batchid integer) RETURNS TABLE(batch_id integer, business_id integer, business_name character varying, business_type_id integer, business_type character varying, description character varying, status character varying, start_date date, expiry_date date, created_count integer, claimed_count integer, redeemed_count integer, template_id integer, discount_type character varying, discount integer, createat date)
    LANGUAGE plpgsql
    AS $$
BEGIN
   PERFORM update_batch_status();
   RETURN QUERY SELECT batch.batch_id, business.business_id, business.business_name, business_types.type_id, business_types.type, 
		templates.description, coupon_status.status, batch.start_date, batch.expiry_date,
		batch.created_count, batch.claimed_count, batch.redeemed_count, templates.template_id, discount_types.type, templates.discount, batch.date_created
	FROM business, templates, batch, business_types, discount_types, coupon_status
	WHERE templates.business_id = business.business_id 
		AND batch.template_id = templates.template_id 
		AND business_types.type_id = business.type_id
		AND templates.discount_type = discount_types.type_id
		AND batch.status_id = coupon_status.status_id
		AND batch.batch_id = batchid;
END; $$;


ALTER FUNCTION public.get_batch(batchid integer) OWNER TO postgres;

--
-- TOC entry 273 (class 1255 OID 17047)
-- Name: get_batch_coupons(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_batch_coupons(batchid integer) RETURNS TABLE(coupon_id integer, description character varying, redeem_code character varying, is_redeemed boolean, business_name character varying, coupon_type_id integer, coupon_type character varying, start_date date, expirty_date date, discount_type character varying, discount integer, purchased_item character varying, date_claimed date, date_used date, customer_id integer, batch_id integer, business_id integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
	PERFORM update_batch_status();
	RETURN QUERY SELECT coupons.coupon_id,templates.description, coupons.code,coupons.is_redeemed, business.business_name,
		business_types.type_id, business_types.type, batch.start_date, batch.expiry_date, discount_types.type, templates.discount, 
		coupons.purchased_item, coupons.date_claimed, coupons.date_used, coupons.customer_id, batch.batch_id,business.business_id
	FROM coupons,business, templates, batch, business_types, discount_types, coupon_status
	WHERE coupons.batch_id = batch.batch_id
		AND templates.business_id = business.business_id 
		AND batch.template_id = templates.template_id 
		AND business_types.type_id = business.type_id
		AND templates.discount_type = discount_types.type_id
		AND batch.status_id = coupon_status.status_id
		AND batch.batch_id = batchID;
END; $$;


ALTER FUNCTION public.get_batch_coupons(batchid integer) OWNER TO postgres;

--
-- TOC entry 269 (class 1255 OID 17040)
-- Name: get_batches(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_batches() RETURNS TABLE(batch_id integer, business_id integer, business_name character varying, business_type_id integer, business_type character varying, description character varying, status character varying, start_date date, expiry_date date, created_count integer, claimed_count integer, redeemed_count integer, template_id integer, discount_type character varying, discount integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
   PERFORM update_batch_status();
   RETURN QUERY SELECT batch.batch_id, business.business_id, business.business_name, business_types.type_id,usiness_types.type, 
		templates.description, coupon_status.status, batch.start_date, batch.expiry_date,
		batch.created_count, batch.claimed_count, batch.redeemed_count, templates.template_id, discount_types.type, templates.discount
	FROM business, templates, batch, business_types, discount_types, coupon_status
	WHERE templates.business_id = business.business_id 
		AND batch.template_id = templates.template_id 
		AND business_types.type_id = business.type_id
		AND templates.discount_type = discount_types.type_id
		AND batch.status_id = coupon_status.status_id;
END; $$;


ALTER FUNCTION public.get_batches() OWNER TO postgres;

--
-- TOC entry 286 (class 1255 OID 25317)
-- Name: get_batches_per_month(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_batches_per_month(businessid integer) RETURNS TABLE(month_created text, year_created double precision, batch_count integer, created integer, claimed integer, redeemed integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY SELECT  to_char(date_created, 'Month') as month_created,
		extract(year from date_created) as year_created,
		count(batch_id)::integer as batch_count,
		sum(created_count)::integer as created,
		sum(claimed_count)::integer as claimed,
		sum(redeemed_count)::integer as redeemed
	FROM get_business_batches(businessID)
	GROUP BY month_created,year_created;
	
END; $$;


ALTER FUNCTION public.get_batches_per_month(businessid integer) OWNER TO postgres;

--
-- TOC entry 253 (class 1255 OID 16725)
-- Name: get_business(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_business(businessid integer) RETURNS TABLE(busines_id integer, business_name character varying, business_type character varying, website character varying, email character varying, phone character varying, about character varying, address text, created date, deleted date, last_seen date)
    LANGUAGE plpgsql
    AS $$
BEGIN
   RETURN QUERY SELECT b.business_id, b.business_name, business_types.type,
		b.website_url, users.email, b.phone_number, b.about,
		CONCAT(address.address1,' ',address.address2,', ',cities.city,' ',countries.country) Address,
		users.create_date, users.delete_date, users.last_seen_date
	FROM business AS b, business_types,address, users, cities, countries
	WHERE b.user_id = users.user_id
		AND b.type_id = business_types.type_id
		AND b.address_id = address.address_id
		AND address.city_id = cities.id
		AND address.country_id = countries.id
		AND b.business_id = businessid;
END; $$;


ALTER FUNCTION public.get_business(businessid integer) OWNER TO postgres;

--
-- TOC entry 271 (class 1255 OID 17043)
-- Name: get_business_batch(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_business_batch(businessid integer, batchid integer) RETURNS TABLE(batch_id integer, business_id integer, business_name character varying, business_type_id integer, business_type character varying, description character varying, status character varying, start_date date, expiry_date date, created_count integer, claimed_count integer, redeemed_count integer, template_id integer, discount_type character varying, discount integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
	 PERFORM update_batch_status();
   RETURN QUERY SELECT batch.batch_id, business.business_id, business.business_name,business_types.type_id,business_types.type, 
		templates.description, coupon_status.status, batch.start_date, batch.expiry_date,
		batch.created_count, batch.claimed_count, batch.redeemed_count, templates.template_id, discount_types.type, templates.discount
	FROM business, templates, batch, business_types, discount_types, coupon_status
	WHERE templates.business_id = business.business_id 
		AND batch.template_id = templates.template_id 
		AND business_types.type_id = business.type_id
		AND templates.discount_type = discount_types.type_id
		AND batch.status_id = coupon_status.status_id
		AND business.business_id = businessid
		AND batch.batch_id = batchID;
END; $$;


ALTER FUNCTION public.get_business_batch(businessid integer, batchid integer) OWNER TO postgres;

--
-- TOC entry 278 (class 1255 OID 25268)
-- Name: get_business_batch_coupons(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_business_batch_coupons(businessid integer, batchid integer) RETURNS TABLE(coupon_id integer, description character varying, redeem_code character varying, is_redeemed boolean, customer_name text, business_name character varying, coupon_type_id integer, coupon_type character varying, start_date date, expirty_date date, discount_type character varying, discount integer, purchased_item character varying, date_claimed date, date_used date, customer_id integer, batch_id integer, business_id integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
   RETURN QUERY SELECT coupons.coupon_id,templates.description, coupons.code,coupons.is_redeemed, 
   CONCAT(customer.first_name,' ',customer.last_name) customer_name, business.business_name,
		business_types.type_id,business_types.type, batch.start_date, batch.expiry_date, discount_types.type, templates.discount, 
		coupons.purchased_item, coupons.date_claimed, coupons.date_used, coupons.customer_id, batch.batch_id,business.business_id
	FROM coupons,business, templates, customer,batch, business_types, discount_types, coupon_status
	WHERE coupons.batch_id = batch.batch_id
		AND templates.business_id = business.business_id 
		AND batch.template_id = templates.template_id 
		AND business_types.type_id = business.type_id
		AND templates.discount_type = discount_types.type_id
		AND batch.status_id = coupon_status.status_id
		AND coupons.customer_id = customer.customer_id
		AND business.business_id = businessID
		AND batch.batch_id = batchID;
END; $$;


ALTER FUNCTION public.get_business_batch_coupons(businessid integer, batchid integer) OWNER TO postgres;

--
-- TOC entry 282 (class 1255 OID 25312)
-- Name: get_business_batches(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_business_batches(businessid integer) RETURNS TABLE(batch_id integer, business_id integer, business_name character varying, business_type_id integer, business_type character varying, description character varying, status character varying, start_date date, expiry_date date, created_count integer, claimed_count integer, redeemed_count integer, template_id integer, discount_type character varying, discount integer, date_created date)
    LANGUAGE plpgsql
    AS $$
BEGIN
   PERFORM update_batch_status();
   RETURN QUERY SELECT batch.batch_id, business.business_id, business.business_name,business_types.type_id, business_types.type, 
		templates.description, coupon_status.status, batch.start_date, batch.expiry_date,
		batch.created_count, batch.claimed_count, batch.redeemed_count, templates.template_id, discount_types.type, templates.discount, batch.date_created
	FROM business, templates, batch, business_types, discount_types, coupon_status
	WHERE templates.business_id = business.business_id 
		AND batch.template_id = templates.template_id 
		AND business_types.type_id = business.type_id
		AND templates.discount_type = discount_types.type_id
		AND batch.status_id = coupon_status.status_id
		AND business.business_id = businessid;
END; $$;


ALTER FUNCTION public.get_business_batches(businessid integer) OWNER TO postgres;

--
-- TOC entry 262 (class 1255 OID 16750)
-- Name: get_business_coupons(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_business_coupons(businessid integer) RETURNS TABLE(coupon_id integer, description character varying, redeem_code character varying, is_redeemed boolean, customer_name text, business_name character varying, coupon_type character varying, start_date date, expiry_date date, discount_type character varying, discount integer, purchased_item character varying, date_claimed date, date_used date, customer_id integer, batch_id integer, business_id integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
   RETURN QUERY SELECT DISTINCT coupons.coupon_id,templates.description, coupons.code,coupons.is_redeemed,
   CONCAT(customer.first_name,' ',customer.last_name) customer_name, business.business_name,
		business_types.type, batch.start_date, batch.expiry_date, discount_types.type, templates.discount, 
		coupons.purchased_item, coupons.date_claimed, coupons.date_used, coupons.customer_id, batch.batch_id,business.business_id
	FROM coupons, business, customer, templates, batch, business_types, discount_types, coupon_status
	WHERE coupons.batch_id = batch.batch_id
		AND templates.business_id = business.business_id
		AND coupons.customer_id = customer.customer_id
		AND batch.template_id = templates.template_id 
		AND business_types.type_id = business.type_id
		AND templates.discount_type = discount_types.type_id
		AND batch.status_id = coupon_status.status_id
		AND templates.business_id = businessID;
END; $$;


ALTER FUNCTION public.get_business_coupons(businessid integer) OWNER TO postgres;

--
-- TOC entry 260 (class 1255 OID 16739)
-- Name: get_business_template(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_business_template(businessid integer, templateid integer) RETURNS TABLE(template_id integer, business_id integer, description character varying, discount_type character varying, discount integer, created date, deleted date)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY SELECT templates.template_id, templates.business_id, templates.description,
		discount_types.type as discount_type, templates.discount, templates.create_date, templates.delete_date
	FROM templates
	LEFT JOIN discount_types
	ON templates.discount_type = discount_types.type_id
	WHERE templates.business_id = businessid
	AND templates.template_id = templateID;
END; $$;


ALTER FUNCTION public.get_business_template(businessid integer, templateid integer) OWNER TO postgres;

--
-- TOC entry 272 (class 1255 OID 17044)
-- Name: get_business_template_batches(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_business_template_batches(businessid integer, templateid integer) RETURNS TABLE(batch_id integer, business_id integer, business_name character varying, business_type_id integer, business_type character varying, description character varying, status character varying, start_date date, expiry_date date, created_count integer, claimed_count integer, redeemed_count integer, template_id integer, discount_type character varying, discount integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
 PERFORM update_batch_status();
   RETURN QUERY SELECT batch.batch_id, business.business_id, business.business_name,business_types.type_id, business_types.type, 
		templates.description, coupon_status.status, batch.start_date, batch.expiry_date,
		batch.created_count, batch.claimed_count, batch.redeemed_count, templates.template_id, discount_types.type, templates.discount
	FROM business, templates, batch, business_types, discount_types, coupon_status
	WHERE templates.business_id = business.business_id 
		AND batch.template_id = templates.template_id 
		AND business_types.type_id = business.type_id
		AND templates.discount_type = discount_types.type_id
		AND batch.status_id = coupon_status.status_id
		AND business.business_id = businessID
		AND templates.template_id = templateID;
END; $$;


ALTER FUNCTION public.get_business_template_batches(businessid integer, templateid integer) OWNER TO postgres;

--
-- TOC entry 261 (class 1255 OID 16746)
-- Name: get_business_templates(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_business_templates(businessid integer) RETURNS TABLE(template_id integer, business_id integer, description character varying, discount_type character varying, discount integer, created date, deleted date)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY SELECT templates.template_id, templates.business_id, templates.description,
		discount_types.type as discount_type, templates.discount, templates.create_date, templates.delete_date
	FROM templates
	LEFT JOIN discount_types
	ON templates.discount_type = discount_types.type_id
	WHERE templates.business_id = businessid;
END; $$;


ALTER FUNCTION public.get_business_templates(businessid integer) OWNER TO postgres;

--
-- TOC entry 254 (class 1255 OID 16726)
-- Name: get_businesses(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_businesses() RETURNS TABLE(busines_id integer, business_name character varying, business_type character varying, website character varying, email character varying, phone character varying, about character varying, address text, created date, deleted date, last_seen date)
    LANGUAGE plpgsql
    AS $$
BEGIN
   RETURN QUERY SELECT b.business_id, b.business_name, business_types.type,
		b.website_url, users.email, b.phone_number, b.about,
		CONCAT(address.address1,' ',address.address2,', ',cities.city,' ',countries.country) Address,
		users.create_date, users.delete_date, users.last_seen_date
	FROM business AS b, business_types,address, users, cities, countries
	WHERE b.user_id = users.user_id
		AND b.type_id = business_types.type_id
		AND b.address_id = address.address_id
		AND address.city_id = cities.id
		AND address.country_id = countries.id;
END; $$;


ALTER FUNCTION public.get_businesses() OWNER TO postgres;

--
-- TOC entry 264 (class 1255 OID 16988)
-- Name: get_coupon(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_coupon(couponid integer) RETURNS TABLE(coupon_id integer, description character varying, redeem_code character varying, is_redeemed boolean, business_name character varying, coupon_type_id integer, coupon_type character varying, start_date date, expirty_date date, discount_type character varying, discount integer, purchased_item character varying, date_claimed date, date_used date, customer_id integer, batch_id integer, business_id integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
   RETURN QUERY SELECT coupons.coupon_id,templates.description, coupons.code,coupons.is_redeemed, business.business_name,
		business_types.type_id, business_types.type, batch.start_date, batch.expiry_date, discount_types.type, templates.discount, 
		coupons.purchased_item, coupons.date_claimed, coupons.date_used, coupons.customer_id, batch.batch_id,business.business_id
	FROM coupons,business, templates, batch, business_types, discount_types, coupon_status
	WHERE coupons.batch_id = batch.batch_id
		AND templates.business_id = business.business_id 
		AND batch.template_id = templates.template_id 
		AND business_types.type_id = business.type_id
		AND templates.discount_type = discount_types.type_id
		AND batch.status_id = coupon_status.status_id
		AND coupons.coupon_id = couponid;
END; $$;


ALTER FUNCTION public.get_coupon(couponid integer) OWNER TO postgres;

--
-- TOC entry 265 (class 1255 OID 16991)
-- Name: get_coupons(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_coupons() RETURNS TABLE(coupon_id integer, description character varying, redeem_code character varying, is_redeemed boolean, business_name character varying, coupon_type_id integer, coupon_type character varying, start_date date, expirty_date date, discount_type character varying, discount integer, purchased_item character varying, date_claimed date, date_used date, customer_id integer, batch_id integer, business_id integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
   RETURN QUERY SELECT coupons.coupon_id,templates.description, coupons.code,coupons.is_redeemed, business.business_name,
		business_types.type_id, business_types.type, batch.start_date, batch.expiry_date, discount_types.type, templates.discount, 
		coupons.purchased_item, coupons.date_claimed, coupons.date_used, coupons.customer_id, batch.batch_id,business.business_id
	FROM coupons,business, templates, batch, business_types, discount_types, coupon_status
	WHERE coupons.batch_id = batch.batch_id
		AND templates.business_id = business.business_id 
		AND batch.template_id = templates.template_id 
		AND business_types.type_id = business.type_id
		AND templates.discount_type = discount_types.type_id
		AND batch.status_id = coupon_status.status_id;
END; $$;


ALTER FUNCTION public.get_coupons() OWNER TO postgres;

--
-- TOC entry 285 (class 1255 OID 25316)
-- Name: get_coupons_per_month(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_coupons_per_month(businessid integer) RETURNS TABLE(month_claimed text, year_claimed double precision, coupons_claimed integer, coupons_redeemed integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY SELECT  to_char(date_claimed, 'Month') as month_claimed, 
	extract(year from date_claimed) as year_claimed,
	count(coupon_id)::integer as coupon_count,
	count(case is_redeemed when true then 1 else null end)::integer redeemed_count
FROM get_business_coupons(2) as coupons
GROUP BY month_claimed,year_claimed;
	
END; $$;


ALTER FUNCTION public.get_coupons_per_month(businessid integer) OWNER TO postgres;

--
-- TOC entry 251 (class 1255 OID 16723)
-- Name: get_customer(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_customer(customerid integer) RETURNS TABLE(customer_id integer, first_name character varying, last_name character varying, dateofbirth date, email character varying, phone character varying, address text, created date, deleted date, last_seen date)
    LANGUAGE plpgsql
    AS $$
BEGIN
   RETURN QUERY SELECT c.customer_id, c.first_name, c.last_name,
	c.date_of_birth, users.email, c.phone_number,
	CONCAT(address.address1,' ',address.address2,', ',cities.city,' ',countries.country) Address,
	users.create_date, users.delete_date, users.last_seen_date
	FROM customer AS c, address, users, cities, countries
	WHERE c.user_id = users.user_id
	AND c.address_id = address.address_id
	AND address.city_id = cities.id
	AND address.country_id = countries.id
	AND c.customer_id = customerid;
END; $$;


ALTER FUNCTION public.get_customer(customerid integer) OWNER TO postgres;

--
-- TOC entry 266 (class 1255 OID 17052)
-- Name: get_customer_available_batches(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_customer_available_batches(customerid integer) RETURNS TABLE(batch_id integer, business_id integer, business_name character varying, business_type_id integer, business_type character varying, description character varying, status character varying, start_date date, expiry_date date, created_count integer, claimed_count integer, redeemed_count integer, template_id integer, discount_type character varying, discount integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM update_batch_status();
   RETURN QUERY SELECT batch.batch_id, business.business_id, business.business_name, business_types.type_id,business_types.type, 
		templates.description, coupon_status.status, batch.start_date, batch.expiry_date,
		batch.created_count, batch.claimed_count, batch.redeemed_count, templates.template_id, discount_types.type, templates.discount
	FROM business, templates, batch, business_types, discount_types, coupon_status
	WHERE templates.business_id = business.business_id 
		AND batch.template_id = templates.template_id 
		AND business_types.type_id = business.type_id
		AND templates.discount_type = discount_types.type_id
		AND batch.status_id = coupon_status.status_id
		AND batch.status_id = 1
		AND batch.batch_id NOT IN (SELECT c.batch_id FROM get_customers_coupons(customerID) c)
		ORDER BY batch.batch_id ASC;
END; $$;


ALTER FUNCTION public.get_customer_available_batches(customerid integer) OWNER TO postgres;

--
-- TOC entry 280 (class 1255 OID 25295)
-- Name: get_customer_available_batches_bycategory(integer, integer, character varying, boolean); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_customer_available_batches_bycategory(customerid integer, categoryid integer, field character varying, isasc boolean) RETURNS TABLE(batch_id integer, business_id integer, business_name character varying, business_type_id integer, business_type character varying, description character varying, status character varying, start_date date, expiry_date date, created_count integer, claimed_count integer, redeemed_count integer, template_id integer, discount_type character varying, discount integer)
    LANGUAGE plpgsql
    AS $_$
DECLARE 
	updated boolean;
	orderedType VARCHAR;

BEGIN
   PERFORM update_batch_status();
   IF isAsc THEN
		orderedType := ' ASC';
	ELSE
		orderedType := ' DESC';
    END IF;
   RETURN QUERY EXECUTE 'SELECT batch.batch_id, business.business_id, business.business_name, business_types.type_id,business_types.type, 
		templates.description, coupon_status.status, batch.start_date, batch.expiry_date,
		batch.created_count, batch.claimed_count, batch.redeemed_count, templates.template_id, discount_types.type, templates.discount
	FROM business, templates, batch, business_types, discount_types, coupon_status
	WHERE templates.business_id = business.business_id 
		AND batch.template_id = templates.template_id 
		AND business_types.type_id = business.type_id
		AND templates.discount_type = discount_types.type_id
		AND batch.status_id = coupon_status.status_id
		AND batch.status_id = 1
		AND batch.batch_id NOT IN (SELECT c.batch_id FROM get_customers_coupons($1) c)
		AND business_types.type_id = $2
		ORDER BY ' || field || orderedType
		USING customerID,categoryID;
END; $_$;


ALTER FUNCTION public.get_customer_available_batches_bycategory(customerid integer, categoryid integer, field character varying, isasc boolean) OWNER TO postgres;

--
-- TOC entry 248 (class 1255 OID 25321)
-- Name: get_customer_coupons_monthly(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_customer_coupons_monthly(customerid integer) RETURNS TABLE(month_claimed text, year_claimed double precision, coupons_claimed integer, coupons_redeemed integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY SELECT  to_char(date_claimed, 'Month') as month_claimed, 
	extract(year from date_claimed) as year_claimed,
	count(coupon_id)::integer as coupon_count,
	count(case is_redeemed when true then 1 else null end)::integer redeemed_count
FROM get_customers_coupons(customerID) as coupons
GROUP BY month_claimed,year_claimed;
	
END; $$;


ALTER FUNCTION public.get_customer_coupons_monthly(customerid integer) OWNER TO postgres;

--
-- TOC entry 250 (class 1255 OID 25325)
-- Name: get_customer_expiring(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_customer_expiring(customerid integer) RETURNS TABLE(coupon_id integer, description character varying, redeem_code character varying, is_redeemed boolean, status_id integer, customer_name text, business_name character varying, coupon_type_id integer, coupon_type character varying, start_date date, expiry_date date, discount_type character varying, discount integer, puchased_item character varying, date_claimed date, date_used date, customer_id integer, batch_id integer, business_id integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY SELECT * FROM get_customers_coupons(customerID) c
WHERE c.status_id = 1 AND c.is_redeemed=false
ORDER BY c.expiry_date asc;
	
END; $$;


ALTER FUNCTION public.get_customer_expiring(customerid integer) OWNER TO postgres;

--
-- TOC entry 249 (class 1255 OID 25323)
-- Name: get_customer_favourites(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_customer_favourites(customerid integer) RETURNS TABLE(business character varying, coupons integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY SELECT business_name, count(coupon_id)::integer as coupons
FROM get_customers_coupons(customerID) 
GROUP BY business_name
ORDER BY coupons DESC;
	
END; $$;


ALTER FUNCTION public.get_customer_favourites(customerid integer) OWNER TO postgres;

--
-- TOC entry 252 (class 1255 OID 16724)
-- Name: get_customers(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_customers() RETURNS TABLE(customer_id integer, first_name character varying, last_name character varying, dateofbirth date, email character varying, phone character varying, address text, created date, deleted date, last_seen date)
    LANGUAGE plpgsql
    AS $$
BEGIN
   RETURN QUERY SELECT c.customer_id, c.first_name, c.last_name,
	c.date_of_birth, users.email, c.phone_number,
	CONCAT(address.address1,' ',address.address2,', ',cities.city,' ',countries.country) Address,
	users.create_date, users.delete_date, users.last_seen_date
	FROM customer AS c, address, users, cities, countries
	WHERE c.user_id = users.user_id
	AND c.address_id = address.address_id
	AND address.city_id = cities.id
	AND address.country_id = countries.id;
	
END; $$;


ALTER FUNCTION public.get_customers() OWNER TO postgres;

--
-- TOC entry 275 (class 1255 OID 17075)
-- Name: get_customers_coupon(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_customers_coupon(customerid integer, couponid integer) RETURNS TABLE(coupon_id integer, description character varying, redeem_code character varying, is_redeemed boolean, business_name character varying, coupon_type_id integer, coupon_type character varying, start_date date, expiry_date date, discount_type character varying, discount integer, purchased_item character varying, date_claimed date, date_used date, customer_id integer, batch_id integer, business_id integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
   RETURN QUERY SELECT coupons.coupon_id,templates.description, coupons.code,coupons.is_redeemed, business.business_name,
		business_types.type_id,business_types.type, batch.start_date, batch.expiry_date, discount_types.type, templates.discount, 
		coupons.purchased_item, coupons.date_claimed, coupons.date_used, coupons.customer_id, batch.batch_id,business.business_id
	FROM coupons,business, templates, batch, business_types, discount_types, coupon_status
	WHERE coupons.batch_id = batch.batch_id
		AND templates.business_id = business.business_id 
		AND batch.template_id = templates.template_id 
		AND business_types.type_id = business.type_id
		AND templates.discount_type = discount_types.type_id
		AND batch.status_id = coupon_status.status_id
		AND coupons.customer_id = customerID
		AND coupons.coupon_id = couponID;
END; $$;


ALTER FUNCTION public.get_customers_coupon(customerid integer, couponid integer) OWNER TO postgres;

--
-- TOC entry 281 (class 1255 OID 25297)
-- Name: get_customers_coupons(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_customers_coupons(customerid integer) RETURNS TABLE(coupon_id integer, description character varying, redeem_code character varying, is_redeemed boolean, status_id integer, customer_name text, business_name character varying, coupon_type_id integer, coupon_type character varying, start_date date, expiry_date date, discount_type character varying, discount integer, purchased_item character varying, date_claimed date, date_used date, customer_id integer, batch_id integer, business_id integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
   RETURN QUERY SELECT coupons.coupon_id,templates.description, coupons.code,coupons.is_redeemed, coupon_status.status_id,
   CONCAT(customer.first_name,' ',customer.last_name) customer_name, business.business_name,
		business_types.type_id, business_types.type, batch.start_date, batch.expiry_date, discount_types.type, templates.discount, 
		coupons.purchased_item, coupons.date_claimed, coupons.date_used, coupons.customer_id, batch.batch_id,business.business_id
	FROM coupons,business, customer, templates, batch, business_types, discount_types, coupon_status
	WHERE coupons.batch_id = batch.batch_id
		AND templates.business_id = business.business_id
		AND coupons.customer_id = customer.customer_id
		AND batch.template_id = templates.template_id 
		AND business_types.type_id = business.type_id
		AND templates.discount_type = discount_types.type_id
		AND batch.status_id = coupon_status.status_id
		AND coupons.customer_id = customerid;
END; $$;


ALTER FUNCTION public.get_customers_coupons(customerid integer) OWNER TO postgres;

--
-- TOC entry 276 (class 1255 OID 25282)
-- Name: get_ordered_batch_coupons(integer, integer, character varying, boolean); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_ordered_batch_coupons(businessid integer, batchid integer, field character varying, isasc boolean DEFAULT true) RETURNS TABLE(coupon_id integer, description character varying, redeem_code character varying, is_redeemed boolean, customer_name text, business_name character varying, coupon_type_id integer, coupon_type character varying, start_date date, expirty_date date, discount_type character varying, discount integer, purchased_item character varying, date_claimed date, date_used date, customer_id integer, batch_id integer, business_id integer)
    LANGUAGE plpgsql
    AS $_$
DECLARE
	orderedType VARCHAR;

BEGIN
	IF isAsc THEN
		orderedType := ' ASC';
	ELSE
		orderedType := ' DESC';
    END IF;
   RETURN QUERY EXECUTE 'SELECT * FROM get_business_batch_coupons($1,$2) ORDER BY ' 
   			|| field || orderedType
			USING businessID,batchID;
END; $_$;


ALTER FUNCTION public.get_ordered_batch_coupons(businessid integer, batchid integer, field character varying, isasc boolean) OWNER TO postgres;

--
-- TOC entry 288 (class 1255 OID 25320)
-- Name: get_ordered_business_batches(integer, character varying, character varying, character varying, boolean); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_ordered_business_batches(businessid integer, bstatus character varying, dtype character varying, sortby character varying, isasc boolean DEFAULT false) RETURNS TABLE(batch_id integer, business_id integer, business_name character varying, business_type_id integer, business_type character varying, description character varying, status character varying, start_date date, expiry_date date, created_count integer, claimed_count integer, redeemed_count integer, template_id integer, discount_type character varying, discount integer, date_created date)
    LANGUAGE plpgsql
    AS $_$
DECLARE
	orderedType VARCHAR;
	discountType VARCHAR;
	queryString TEXT;
BEGIN
	IF isAsc THEN
		orderedType := ' ASC';
	ELSE
		orderedType := ' DESC';
    END IF;

queryString :='SELECT * FROM get_business_batches($1)';

IF dtype LIKE 'Percentage' OR dtype LIKE 'Flat' THEN
	queryString := queryString || ' WHERE discount_type = ' || quote_literal(dtype);
END IF;

IF bstatus LIKE 'Active' OR bstatus LIKE 'Expired' THEN
	IF dtype LIKE 'All' THEN
		queryString := queryString || ' WHERE ';
	ELSE
		queryString := queryString || ' AND ';
	END IF;	
	queryString := queryString || 'status = ' || quote_literal(bstatus);
END IF;

   RETURN QUERY EXECUTE queryString || ' ORDER BY ' || sortBy || orderedType
	USING businessID; 
END; $_$;


ALTER FUNCTION public.get_ordered_business_batches(businessid integer, bstatus character varying, dtype character varying, sortby character varying, isasc boolean) OWNER TO postgres;

--
-- TOC entry 291 (class 1255 OID 25340)
-- Name: get_ordered_customer_coupons(integer, integer, character varying, character varying, character varying, boolean); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_ordered_customer_coupons(customerid integer, statusid integer, categorytype character varying, sortby character varying, isredeemed character varying, isasc boolean DEFAULT true) RETURNS TABLE(coupon_id integer, description character varying, redeem_code character varying, is_redeemed boolean, status_id integer, customer_name text, business_name character varying, coupon_type_id integer, coupon_type character varying, start_date date, expiry_date date, discount_type character varying, discount integer, purchased_item character varying, date_claimed date, date_used date, customer_id integer, batch_id integer, business_id integer)
    LANGUAGE plpgsql
    AS $_$
DECLARE
	orderedType VARCHAR;
	redeemed boolean;
	queryString TEXT;
BEGIN
	IF isAsc THEN
		orderedType := ' ASC';
	ELSE
		orderedType := ' DESC';
    END IF;	
	
	queryString :='SELECT * FROM get_customers_coupons($1)';

	IF categoryType NOT LIKE 'All' THEN
		queryString := queryString || ' WHERE coupon_type = ' || quote_literal(categoryType);
	END IF;

 IF statusID = 1 OR statusID = 2 OR statusID = 3 THEN
 	IF categoryType LIKE 'All' THEN
		queryString := queryString || ' WHERE ';
 	ELSE
 		queryString := queryString || ' AND ';
 	END IF;	
 	queryString := queryString || 'status_id = ' || statusID;
 END IF;
	
 	if isRedeemed NOT LIKE 'All' THEN
 		IF categoryType LIKE 'All' AND statusID > 3 THEN
 			queryString := queryString || ' WHERE ';
 		ELSE
 			queryString := queryString || ' AND ';
 		END IF;	
			
 		if isRedeemed LIKE 'true' THEN
 			redeemed := true;
 		ELSIF isRedeemed LIKE 'false' THEN
 			redeemed := false;
 		END IF;
		
 		queryString := queryString || 'is_redeemed = ' || redeemed;
 	END IF;
	
   RETURN QUERY EXECUTE queryString || ' ORDER BY ' || sortBy || orderedType
	USING customerID; 

END; $_$;


ALTER FUNCTION public.get_ordered_customer_coupons(customerid integer, statusid integer, categorytype character varying, sortby character varying, isredeemed character varying, isasc boolean) OWNER TO postgres;

--
-- TOC entry 245 (class 1255 OID 16669)
-- Name: get_template(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_template(templateid integer) RETURNS TABLE(template_id integer, business_id integer, description character varying, dyscount_type character varying, discount integer, created date, deleted date)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY SELECT templates.template_id, templates.business_id, templates.description,
		discount_types.type as discount_type, templates.discount, templates.create_date, templates.delete_date
	FROM templates
	LEFT JOIN discount_types
	ON templates.discount_type = discount_types.type_id
	WHERE templates.template_id = templateid;
END; $$;


ALTER FUNCTION public.get_template(templateid integer) OWNER TO postgres;

--
-- TOC entry 270 (class 1255 OID 17042)
-- Name: get_template_batches(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_template_batches(templateid integer) RETURNS TABLE(batch_id integer, business_id integer, business_name character varying, business_type_id integer, business_type character varying, description character varying, status character varying, start_date date, expiry_date date, created_count integer, claimed_count integer, redeemed_count integer, template_id integer, discount_type character varying, discount integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
 PERFORM update_batch_status();
   RETURN QUERY SELECT batch.batch_id, business.business_id, business.business_name,business_types.type_id,business_types.type, 
		templates.description, coupon_status.status, batch.start_date, batch.expiry_date,
		batch.created_count, batch.claimed_count, batch.redeemed_count, templates.template_id, discount_types.type, templates.discount
	FROM business, templates, batch, business_types, discount_types, coupon_status
	WHERE templates.business_id = business.business_id 
		AND batch.template_id = templates.template_id 
		AND business_types.type_id = business.type_id
		AND templates.discount_type = discount_types.type_id
		AND batch.status_id = coupon_status.status_id
		AND batch.template_id = templateID;
END; $$;


ALTER FUNCTION public.get_template_batches(templateid integer) OWNER TO postgres;

--
-- TOC entry 246 (class 1255 OID 16704)
-- Name: get_templates(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_templates() RETURNS TABLE(template_id integer, business_id integer, description character varying, discount_type character varying, discount integer, created date, deleted date)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY SELECT templates.template_id, templates.business_id, templates.description,
		discount_types.type as discount_type, templates.discount, templates.create_date, templates.delete_date
	FROM templates
	LEFT JOIN discount_types
	ON templates.discount_type = discount_types.type_id;
END; $$;


ALTER FUNCTION public.get_templates() OWNER TO postgres;

--
-- TOC entry 287 (class 1255 OID 25318)
-- Name: get_total_customers(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_total_customers(businessid integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$

DECLARE
	total INTEGER;

BEGIN
    SELECT INTO total COUNT(DISTINCT customer_id) as total_users
FROM get_business_coupons(2);

	RETURN total;
	
END; $$;


ALTER FUNCTION public.get_total_customers(businessid integer) OWNER TO postgres;

--
-- TOC entry 284 (class 1255 OID 25311)
-- Name: insert_batch(integer, integer, date, date, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.insert_batch(templateid integer, createdc integer, startdate date, expirydate date, statusid integer) RETURNS TABLE(batch_id integer, business_id integer, business_name character varying, business_type character varying, description character varying, status character varying, start_date date, expiry_date date, created_count integer, claimed_count integer, redeemed_count integer, template_id integer, discount_type character varying, discount integer, date_created date)
    LANGUAGE plpgsql
    AS $$

DECLARE
	newBatch_id INTEGER;
BEGIN
    PERFORM update_batch_status();
   /*Create the batch*/
	INSERT INTO batch(template_id, created_count, claimed_count, redeemed_count, start_date, expiry_date, status_id, date_created)
	VALUES (templateID, createdC, 0, 0, startDate, expiryDate, statusID, NOW())
	RETURNING batch.batch_id INTO newBatch_id;

IF newBatch_id IS NOT NULL THEN
	    RETURN QUERY SELECT * FROM get_batch(newBatch_id);
	END IF;
END; $$;


ALTER FUNCTION public.insert_batch(templateid integer, createdc integer, startdate date, expirydate date, statusid integer) OWNER TO postgres;

--
-- TOC entry 289 (class 1255 OID 16720)
-- Name: insert_business(character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.insert_business(pass character varying, businessname character varying, btype character varying, websiteurl character varying, e_mail character varying, phoneno character varying, addr1 character varying, addr2 character varying, thecity character varying, thecountry character varying, aboutus character varying) RETURNS TABLE(busines_id integer, business_name character varying, business_type character varying, website character varying, email character varying, phone character varying, about character varying, address text, created date, deleted date, last_seen date)
    LANGUAGE plpgsql
    AS $$

DECLARE
	cityid  INTEGER;
	countryid INTEGER;
	businessType_id INTEGER;
	newUser_id INTEGER;
	newBusiness_id INTEGER;
	addr_id INTEGER;
	
BEGIN
   /*Check if City exists first*/
   LOOP
	   BEGIN  -- start inner block inside loop to handle possible exception

	   SELECT INTO cityid ci.id FROM cities ci WHERE ci.city = thecity;
		
	   IF NOT FOUND THEN
		  INSERT INTO cities (city) VALUES (thecity)
		  RETURNING cities.id INTO cityid;
	   END IF;

	   EXCEPTION WHEN UNIQUE_VIOLATION THEN     -- inserted in concurrent session.
		  RAISE NOTICE 'It actually happened!'; -- hardly ever happens
	   END;

	   EXIT WHEN cityid IS NOT NULL;          -- else keep looping
	END LOOP;
    /*Check if Country exists*/
    LOOP
	   BEGIN  -- start inner block inside loop to handle possible exception

	   SELECT INTO countryid  co.id FROM countries co WHERE co.country = thecountry;

	   IF NOT FOUND THEN
		  INSERT INTO countries (country) VALUES (thecountry)
		  RETURNING countries.id INTO countryid;
	   END IF;

	   EXCEPTION WHEN UNIQUE_VIOLATION THEN     -- inserted in concurrent session.
		  RAISE NOTICE 'It actually happened!'; -- hardly ever happens
	   END;

	   EXIT WHEN countryid IS NOT NULL;          -- else keep looping
	END LOOP;

	 /*Check if Business Type exists*/
    LOOP
	   BEGIN  -- start inner block inside loop to handle possible exception

	   SELECT INTO businessType_id  bt.type_id FROM business_types bt WHERE bt.type = btype;

	   IF NOT FOUND THEN
		  INSERT INTO business_types (type) VALUES (btype)
		  RETURNING business_types.type_id INTO businessType_id;
	   END IF;

	   EXCEPTION WHEN UNIQUE_VIOLATION THEN     -- inserted in concurrent session.
		  RAISE NOTICE 'It actually happened!'; -- hardly ever happens
	   END;

	   EXIT WHEN businessType_id IS NOT NULL;          -- else keep looping
	END LOOP;

   /*Create the address*/
   INSERT INTO address(address1, address2,city_id,country_id)
   VALUES(addr1, addr2, cityid::INTEGER, countryid::INTEGER) RETURNING address.address_id INTO addr_id;
   
   /*Create the user*/
   INSERT INTO users(password,create_date,last_seen_date, email)
   VALUES(pass, NOW(),NOW(), e_mail) RETURNING users.user_id INTO newUser_id;
   	
   /*Create the business*/
   INSERT INTO business(business_name, type_id, website_url, phone_number, address_id, about, user_id)
   VALUES(businessName, businessType_id, websiteURL, phoneNo, addr_id::INTEGER, aboutUs, newUser_id::INTEGER) 
   RETURNING business.business_id INTO newBusiness_id;
   
   IF newBusiness_id IS NOT NULL THEN
	   RETURN QUERY SELECT * FROM get_business(newBusiness_id);
			
	END IF;
END; $$;


ALTER FUNCTION public.insert_business(pass character varying, businessname character varying, btype character varying, websiteurl character varying, e_mail character varying, phoneno character varying, addr1 character varying, addr2 character varying, thecity character varying, thecountry character varying, aboutus character varying) OWNER TO postgres;

--
-- TOC entry 277 (class 1255 OID 25284)
-- Name: insert_business_template_batch(integer, integer, integer, date, date, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.insert_business_template_batch(businessid integer, templateid integer, createdc integer, startdate date, expirydate date, statusid integer) RETURNS TABLE(batch_id integer, business_id integer, business_name character varying, business_type_id integer, business_type character varying, description character varying, status character varying, start_date date, expiry_date date, created_count integer, claimed_count integer, redeemed_count integer, template_id integer, discount_type character varying, discount integer)
    LANGUAGE plpgsql
    AS $$

DECLARE
	newBatch_id INTEGER;
BEGIN
    PERFORM update_batch_status();     	
   /*Create the batch*/
	INSERT INTO batch(template_id, created_count, claimed_count, redeemed_count, start_date, expiry_date, status_id)
	VALUES (templateID, createdC, 0, 0, startDate, expiryDate, statusID)
	RETURNING batch.batch_id INTO newBatch_id;
   
   IF newBatch_id IS NOT NULL THEN
	    RETURN QUERY SELECT * FROM get_business_batch(businessID,newBatch_id);
	END IF;
END; $$;


ALTER FUNCTION public.insert_business_template_batch(businessid integer, templateid integer, createdc integer, startdate date, expirydate date, statusid integer) OWNER TO postgres;

--
-- TOC entry 290 (class 1255 OID 25341)
-- Name: insert_customer(character varying, character varying, character varying, character varying, date, character varying, character varying, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.insert_customer(pass character varying, firstname character varying, lastname character varying, gender1 character varying, dob date, e_mail character varying, phoneno character varying, addr1 character varying, addr2 character varying, thecity character varying, thecountry character varying) RETURNS TABLE(customer_id integer, first_name character varying, last_name character varying, dateofbirth date, email character varying, phone character varying, address text, created date, deleted date, last_seen date)
    LANGUAGE plpgsql
    AS $$

DECLARE
	cityid  INTEGER;
	countryid INTEGER;
	newUser_id INTEGER;
	newCustomer_id INTEGER;
	addr_id INTEGER;
	
BEGIN
   LOOP
	   BEGIN  -- start inner block inside loop to handle possible exception

	   SELECT INTO cityid ci.id FROM cities ci WHERE ci.city = thecity;
		
	   IF NOT FOUND THEN
		  INSERT INTO cities (city) VALUES (thecity)
		  RETURNING cities.id INTO cityid;
	   END IF;

	   EXCEPTION WHEN UNIQUE_VIOLATION THEN     -- inserted in concurrent session.
		  RAISE NOTICE 'It actually happened!'; -- hardly ever happens
	   END;

	   EXIT WHEN cityid IS NOT NULL;          -- else keep looping
	END LOOP;
    /*Country*/
    LOOP
	   BEGIN  -- start inner block inside loop to handle possible exception

	   SELECT INTO countryid  co.id FROM countries co WHERE co.country = thecountry;

	   IF NOT FOUND THEN
		  INSERT INTO countries (country) VALUES (thecountry)
		  RETURNING countries.id INTO countryid;
	   END IF;

	   EXCEPTION WHEN UNIQUE_VIOLATION THEN     -- inserted in concurrent session.
		  RAISE NOTICE 'It actually happened!'; -- hardly ever happens
	   END;

	   EXIT WHEN countryid IS NOT NULL;          -- else keep looping
	END LOOP;
-- 	RAISE NOTICE 'city%',thecity;
-- 	RAISE NOTICE 'country%',thecountry;

   /*Create the address*/
   INSERT INTO address(address1, address2,city_id,country_id)
   VALUES(addr1, addr2, cityid::INTEGER, countryid::INTEGER) RETURNING address.address_id INTO addr_id;
   
   /*Create the user*/
   INSERT INTO users(password, create_date,last_seen_date, email)
   VALUES(pass, NOW(),NOW(), e_mail) RETURNING users.user_id INTO newUser_id;
   	
   /*Create the customer*/
   INSERT INTO customer(first_name, last_name, gender, date_of_birth, phone_number, address_id, user_id)
   VALUES(firstName, lastName, gender1, dob, phoneNo, addr_id::INTEGER, newUser_id::INTEGER) 
   RETURNING customer.customer_id INTO newCustomer_id;
   
   IF newCustomer_id IS NOT NULL THEN
	   RETURN QUERY SELECT c.customer_id, c.first_name, c.last_name,
		c.date_of_birth, users.email, c.phone_number,
		CONCAT(address.address1,' ',address.address2,', ',cities.city,' ',countries.country) Address,
		users.create_date, users.delete_date, users.last_seen_date
		FROM customer AS c, address, users, cities, countries
		WHERE c.user_id = users.user_id
		AND c.address_id = address.address_id
		AND address.city_id = cities.id
		AND address.country_id = countries.id
		AND c.customer_id = newCustomer_id::INTEGER;
			
	END IF;
END; $$;


ALTER FUNCTION public.insert_customer(pass character varying, firstname character varying, lastname character varying, gender1 character varying, dob date, e_mail character varying, phoneno character varying, addr1 character varying, addr2 character varying, thecity character varying, thecountry character varying) OWNER TO postgres;

--
-- TOC entry 259 (class 1255 OID 16736)
-- Name: insert_template(integer, character varying, character varying, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.insert_template(businessid integer, descr character varying, discounttype character varying, thediscount integer) RETURNS TABLE(template_id integer, business_id integer, description character varying, discount_type character varying, discount integer, created date, deleted date)
    LANGUAGE plpgsql
    AS $$

DECLARE
	type_id INTEGER;	
	newTemplate_id INTEGER;
BEGIN
   /*Check if City exists first*/
   LOOP
	   BEGIN  -- start inner block inside loop to handle possible exception

	   SELECT INTO type_id dt.type_id FROM discount_types dt WHERE LOWER(dt.type) = LOWER(discountType);
		
	   IF NOT FOUND THEN
		  INSERT INTO discount_types (type) VALUES (discountType)
		  RETURNING discount_types.type_id INTO type_id;
	   END IF;

	   EXCEPTION WHEN UNIQUE_VIOLATION THEN     -- inserted in concurrent session.
		  RAISE NOTICE 'It actually happened!'; -- hardly ever happens
	   END;

	   EXIT WHEN type_id IS NOT NULL;          -- else keep looping
	END LOOP;
      	
   /*Create the business*/
	INSERT INTO templates(business_id, description, discount_type, discount, create_date)
	VALUES (businessID, descr, type_id, theDiscount, NOW())
	RETURNING templates.template_id INTO newTemplate_id;
   
   IF newTemplate_id IS NOT NULL THEN
	    RETURN QUERY SELECT templates.template_id, templates.business_id, templates.description,
			discount_types.type as discount_type, templates.discount, templates.create_date, templates.delete_date
		FROM templates
		LEFT JOIN discount_types
			ON templates.discount_type = discount_types.type_id
		WHERE templates.template_id = newTemplate_id;

	END IF;
END; $$;


ALTER FUNCTION public.insert_template(businessid integer, descr character varying, discounttype character varying, thediscount integer) OWNER TO postgres;

--
-- TOC entry 255 (class 1255 OID 17031)
-- Name: isafter(timestamp without time zone, timestamp without time zone); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.isafter(start_date timestamp without time zone, end_date timestamp without time zone) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
DECLARE   
   diffSeconds INT;
   
BEGIN
     -- get the rate based on film_id
     SELECT INTO diffSeconds *
	 FROM DATEDIFF('second', start_date::timestamp, end_date::timestamp);
	 
	 IF diffSeconds IS NOT NULL THEN
		 IF diffSeconds <= 0 THEN
			RAISE NOTICE 'start date is after end date';
			RETURN true;
		 ELSE 
			RAISE NOTICE 'start date is before end date';
			RETURN false;
		 END IF;
	ELSE 
		RAISE NOTICE 'diffSeconds is NULL';
		RETURN false;
	END IF;
END; $$;


ALTER FUNCTION public.isafter(start_date timestamp without time zone, end_date timestamp without time zone) OWNER TO postgres;

--
-- TOC entry 279 (class 1255 OID 25291)
-- Name: redeem_coupon(integer, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.redeem_coupon(businessid integer, rcode character varying, item character varying DEFAULT NULL::character varying) RETURNS boolean
    LANGUAGE plpgsql
    AS $$

DECLARE
	couponID INTEGER;
BEGIN
	SELECT INTO couponID coupon_id FROM get_business_coupons(businessID) 
	WHERE redeem_code = rcode;
	
	IF couponID IS NOT NULL THEN
		UPDATE coupons
		SET is_redeemed = true,
		date_used = NOW(),
		purchased_item = COALESCE(redeem_coupon.item, coupons.purchased_item)
		WHERE coupon_id = couponID;
		RETURN true;
	ELSE
		RETURN false;
	END IF;
   
END $$;


ALTER FUNCTION public.redeem_coupon(businessid integer, rcode character varying, item character varying) OWNER TO postgres;

--
-- TOC entry 274 (class 1255 OID 17074)
-- Name: return_coupon(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.return_coupon(couponid integer) RETURNS void
    LANGUAGE plpgsql
    AS $$

DECLARE
	couponBatchID INTEGER;
	newCouponID INTEGER;
BEGIN
	PERFORM update_batch_status();
	
	UPDATE batch 
	SET claimed_count = claimed_count - 1
	WHERE batch_id = (SELECT batch_id FROM coupons WHERE coupon_id = couponID);
	
	DELETE FROM coupons
	WHERE coupon_id = couponID;	
	
END $$;


ALTER FUNCTION public.return_coupon(couponid integer) OWNER TO postgres;

--
-- TOC entry 256 (class 1255 OID 17034)
-- Name: update_batch_status(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_batch_status() RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE batch as b
	SET status_id = 
	(CASE 
		WHEN (SELECT isafter FROM isAfter(NOW()::timestamp,b.expiry_date)) = true THEN 2
		WHEN (SELECT isafter FROM isAfter(NOW()::timestamp,b.expiry_date)) = false THEN 1
	END);
END; $$;


ALTER FUNCTION public.update_batch_status() OWNER TO postgres;

--
-- TOC entry 258 (class 1255 OID 16729)
-- Name: update_business(integer, character varying, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_business(businessid integer, bname character varying DEFAULT NULL::character varying, btype character varying DEFAULT NULL::character varying, website character varying DEFAULT NULL::character varying, phone character varying DEFAULT NULL::character varying, about character varying DEFAULT NULL::character varying) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
DECLARE
	typeID INTEGER;
BEGIN
	SELECT INTO typeID bt.type_id FROM business_types bt WHERE bt.type = btype;

	UPDATE business
	   SET business_name = COALESCE(update_business.bname, business.business_name),
	       type_id = COALESCE(typeID, business.type_id),
		   website_url = COALESCE(update_business.website, business.website_url),		   
		   phone_number = COALESCE(update_business.phone, business.phone_number),
		   about = COALESCE(update_business.about, business.about)
	WHERE business.business_id = businessID;
	RETURN FOUND;
END;
$$;


ALTER FUNCTION public.update_business(businessid integer, bname character varying, btype character varying, website character varying, phone character varying, about character varying) OWNER TO postgres;

--
-- TOC entry 267 (class 1255 OID 17064)
-- Name: update_claimed(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_claimed(batchid integer) RETURNS void
    LANGUAGE plpgsql
    AS $$

BEGIN
	
   /*Check if the batch is available to the customer*/
	UPDATE batch 
	SET claimed_count = (SELECT COUNT(coupon_id) 
						 FROM coupons 
						 WHERE batch_id = batchID) 
	WHERE batch_id = batchID;
END $$;


ALTER FUNCTION public.update_claimed(batchid integer) OWNER TO postgres;

--
-- TOC entry 257 (class 1255 OID 16728)
-- Name: update_customer(integer, character varying, character varying, date, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_customer(customerid integer, firstname character varying DEFAULT NULL::character varying, lastname character varying DEFAULT NULL::character varying, dob date DEFAULT NULL::date, phone character varying DEFAULT NULL::character varying) RETURNS boolean
    LANGUAGE plpgsql
    AS $$

BEGIN
	UPDATE customer
	   SET first_name = COALESCE(update_customer.firstName, customer.first_name),
	       last_name = COALESCE(update_customer.lastName, customer.last_name),
		   date_of_birth = COALESCE(update_customer.dob, customer.date_of_birth),		   
		   phone_number = COALESCE(update_customer.phone, customer.phone_number)
	WHERE customer.customer_id = customerID;
	RETURN FOUND;
END;
$$;


ALTER FUNCTION public.update_customer(customerid integer, firstname character varying, lastname character varying, dob date, phone character varying) OWNER TO postgres;

--
-- TOC entry 263 (class 1255 OID 16752)
-- Name: update_template(integer, integer, character varying, character varying, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_template(businessid integer, templateid integer, descr character varying DEFAULT NULL::character varying, discounttype character varying DEFAULT NULL::character varying, thediscount integer DEFAULT NULL::integer) RETURNS boolean
    LANGUAGE plpgsql
    AS $$

DECLARE
	type_id INTEGER;		
BEGIN
   /*Check if discount type exists first*/
   	   IF discountType IS NOT NULL THEN
	   	SELECT INTO type_id dt.type_id FROM discount_types dt WHERE LOWER(dt.type) = LOWER(discountType);
	   END IF;
     
   UPDATE templates
	   SET description = COALESCE(NULLIF(update_template.descr,''), templates.description),
	       discount_type = COALESCE(type_id, templates.discount_type),
		   discount = COALESCE(update_template.theDiscount, templates.discount)
	WHERE templates.template_id = templateID
	AND templates.business_id = businessID;
	RETURN FOUND;
END; $$;


ALTER FUNCTION public.update_template(businessid integer, templateid integer, descr character varying, discounttype character varying, thediscount integer) OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;




-- Completed on 2019-10-01 18:00:31 EEST

--
-- PostgreSQL database dump complete
--

