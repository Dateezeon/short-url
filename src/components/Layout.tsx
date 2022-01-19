import { useEffect, useRef, useState } from "react";
import { Card, Form, Button, FloatingLabel, Alert } from "react-bootstrap";
import styled from "styled-components";

import Table from "./Table";
import { getUrls, addUrl } from "../utils";

const { Body } = Card;

const LayoutStyles = styled.div`
  .Title {
    font-size: 40px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .card {
    padding: 20px;
  }
  .table {
    text-align: center;
  }
  .spinner-grow {
    height: 100px;
    width: 100px;
    margin: auto;
    display: flex;
  }
  .TableTitle {
    font-size: 28px;
    text-align: center;
    font-weight: bold;
    margin: 20px 0;
  }
  .btn {
    background-color: #0383b2;
    border-color: #0383b2;
    font-weight: bold;
  }

  .Alert {
    font-size: 13px;
    text-align: center;
    margin: auto;
    margin-bottom: 40px;
    background-color: #8e9eba;
    color: white;
  }
`;

const Layout = () => {
  const urlRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const slugRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [fetch, setFetch] = useState(true);
  const [urls, setURLS] = useState([]);
  const [urlValidated, setUrlValidated] = useState(false);

  const columns = [
    { id: "url", name: "Original" },
    { id: "short_url", name: "Shortened" },
    { id: "delete", name: "" },
  ];

  useEffect(() => {
    if (fetch) {
      getUrls((urls: any) => {
        const url = urlRef.current;
        const slug = slugRef.current;
        if (url) url.value = '';
        if (slug) slug.value = '';
        setFetch(false);
        setURLS(urls);
      });
    }
  }, [fetch]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const url = urlRef.current;
    const slug = slugRef.current;
    let payload: Record<string,any> = {};
    if (url.value) {
      try {
        new URL(url.value);
      } catch (_) {
        return setUrlValidated(true);
      }
      payload.url = url.value;
      if (slug.value) {
        payload.slug = slug.value;
      }
      setUrlValidated(false);
      addUrl(payload, () => {
        setFetch(true);
      })
    } else {
      setUrlValidated(true)
    }
  };

  return (
    <LayoutStyles>
      <div className="Title">Short URL</div>
      <Alert className="Alert" variant="dark">
          Transform those long, hard to remember links into something more manageable.
          To get started please enter the full URL with protocol e.g. https://www.google.com
      </Alert>
      <Card>
        <Body>
          <Form noValidate onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="Enter URL"
              className="mb-3"
            >
              <Form.Control ref={urlRef} required isInvalid={urlValidated} placeholder="Enter URL" />
              <Form.Control.Feedback type="invalid">
                Please enter a valid URL.
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="(Optional) Custom Slug"
              className="mb-3"
            >
              <Form.Control ref={slugRef} placeholder="(Optional) Custom Slug" />
            </FloatingLabel>
            <Button type="submit">Shorten URL</Button>
          </Form>
          {urls.length > 0 &&
            <>
              <div className="TableTitle">Your URLs</div>
              <Table
                data={urls}
                columns={columns}
                setFetch={setFetch}
              />
            </>
          }
        </Body>
      </Card>
    </LayoutStyles>
  );
};

export default Layout;