import queryString from "query-string";
import slugify from "slugify";

export const sendRequest = async <T>(props: IRequest) => {
  //type
  let {
    url,
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  const options: any = {
    method: method,
    // by default setting the content-type to be json type
    headers: new Headers({
      "content-type": "application/json",
      Accept: "application/json",
      ...headers,
    }),
    body: body ? JSON.stringify(body) : null,
    ...nextOption,
  };
  if (useCredentials) {
    options.credentials = "include";
  }

  if (queryParams) {
    url = `${url}?${queryString.stringify(queryParams)}`;
  }

  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json() as T; //generic
    } else {
      return res.json().then(function (json) {
        // to be able to access error status when you catch the error
        return {
          statusCode: res.status,
          message: json?.message ?? "",
          error: json?.error ?? "",
        } as T;
      });
    }
  });
};

// day la file api.ts
// export const sendRequestFile = async <T>(props: IRequest) => {
//     //type
//     let {
//         url,
//         method,
//         body,
//         queryParams = {},
//         useCredentials = false,
//         headers = {},
//         nextOption = {},
//     } = props;
//
//     const options: any = {
//         method: method,
//         // by default setting the content-type to be json type
//         headers: new Headers({...headers}),
//         body: body ? body : null,
//         ...nextOption,
//     };
//     if (useCredentials) options.credentials = "include";
//
//     if (queryParams) {
//         url = `${url}?${queryString.stringify(queryParams)}`;
//     }
//
//     return fetch(url, options).then((res) => {
//         if (res.ok) {
//             return res.json() as T; //generic
//         } else {
//             return res.json().then(function (json) {
//                 // to be able to access error status when you catch the error
//                 return {
//                     statusCode: res.status,
//                     message: json?.message ?? "",
//                     error: json?.error ?? "",
//                 } as T;
//             });
//         }
//     });
// };

export const sendRequestFile = async <T>(props: IRequest) => {
  let {
    url,
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  const options: any = {
    method: method,
    headers: new Headers({ ...headers }),
    body: body ? body : null,
    ...nextOption,
  };

  if (useCredentials) options.credentials = "include";

  if (queryParams) {
    url = `${url}?${queryString.stringify(queryParams)}`;
  }

  const res = await fetch(url, options);

  if (res.ok) {
    const contentType = res.headers.get("Content-Type");
    if (contentType?.includes("application/json")) {
      return res.json() as T;
    } else {
      return res.text();
    }
  } else {
    const errorData = await res.json();
    return {
      statusCode: res.status,
      message: errorData?.message ?? "",
      error: errorData?.error ?? "",
    } as T;
  }
};

export const converSlugUrl = (slug: string) => {
  if (!slug) return "";
  return slugify(slug, {
    lower: true,
    locale: "vi",
  });
};
