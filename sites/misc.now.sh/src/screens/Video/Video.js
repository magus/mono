import React from 'react';
import { Spacer, Button } from '@magusn/react';
import styled from 'styled-components';

export function Video() {
  const input_ref = React.useRef();

  const [result, set_result] = React.useState(null);
  const [disabled, set_disabled] = React.useState(false);

  function handle_focus() {
    input_ref.current.select();
  }

  function handle_keyDown(event) {
    if (disabled) {
      return;
    }

    switch (event.key) {
      case 'Enter': {
        event.preventDefault();
        input_ref.current.blur();
        handle_video_fetch(input_ref.current.value);
        return;
      }
      case 'Escape': {
        event.preventDefault();
        input_ref.current.value = '';
        return;
      }
      default:
      // do nothing
    }
  }

  async function handle_video_fetch(video_url) {
    set_disabled(true);
    set_result(null);

    const url = new URL(window.location.href);
    url.pathname = '/api/video';
    url.searchParams.set('url', video_url);

    const resp = await fetch(url);
    const json = await resp.json();

    set_result(json);
    set_disabled(false);
  }

  return (
    <Container>
      <SearchContainer action="">
        <Input
          ref={input_ref}
          disabled={disabled}
          aria-label="Download video from url"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          onFocus={handle_focus}
          type="url"
          enterkeyhint="go"
          name="url"
          id="url"
          placeholder="https://twitter.com/magusnn/status/1458443583640334337"
          onKeyDown={handle_keyDown}
        />
        <SearchIcon>🎥</SearchIcon>
      </SearchContainer>

      <Spacer vertical size="2" />

      <Feedback>{result?.error}</Feedback>

      <Spacer vertical size="2" />

      <Results>
        {disabled ? (
          <Loading>⏳ Loading …</Loading>
        ) : (
          result?.data?.map((file) => {
            return (
              <a key={file.href} download={file.full} href={file.href} rel="noreferrer" target="_blank">
                <VideoButton>{file.full}</VideoButton>
              </a>
            );
          })
        )}
      </Results>
    </Container>
  );
}

// unused for now, maybe eventually on page download
// eslint-disable-next-line
async function force_download(url, filename) {
  try {
    const resp = await fetch(url, {
      headers: new Headers({
        Origin: location.origin,
      }),
      mode: 'cors',
    });

    const blob = await resp.blob();

    const a = document.createElement('a');
    a.style.display = 'none';
    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (err) {
    console.error(err);
  }
}

const Loading = styled.div`
  font-size: var(--font-xLarge);
  font-weight: var(--font-bold);
`;

const VideoButton = styled(Button)`
  color: rgb(var(--main-color-button-font));
  text-transform: none;
`;

const Results = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Feedback = styled.div`
  width: 100%;
  color: rgb(var(--red));
  font-weight: var(--font-bold);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  padding: var(--spacer-8) var(--spacer-4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchContainer = styled.form`
  position: relative;
  width: 100%;
  height: var(--spacer-6);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SearchIcon = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: var(--spacer-6);
  padding: 0 0 0 var(--spacer-2);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: var(--font-large);
`;

const Input = styled.input.attrs({
  placeholderTextColor: 'pink',
})`
  width: 100%;
  height: 100%;
  padding: var(--spacer-1) var(--spacer-2) var(--spacer-1) var(--spacer-6);
  border-radius: var(--spacer-3);

  font-size: var(--font-normal);
  color: rgb(var(--font-color));
  white-space: pre;

  background-color: rgb(var(--gray));
  border: 1px solid transparent;
  box-shadow: none;

  :focus {
    outline: none;
    background-color: rgb(var(--background-color));
  }

  :disabled {
    background-color: rgb(var(--gray));
  }

  :hover,
  :focus {
    box-shadow: 0 1px 6px rgba(var(--font-color), 0.28);
  }

  @media (prefers-color-scheme: dark) {
    :hover,
    :focus {
      border-color: rgb(var(--gray800));
      box-shadow: none;
    }
  }

  /* reset webkit search field appearance */
  -webkit-appearance: textfield;
  ::-webkit-search-cancel-button {
    display: none;
  }
`;
