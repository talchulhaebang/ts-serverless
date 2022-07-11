export const toResponse = ({
  statusCode = 200,
  headers = {
    "Content-Type": "application/json;charset=UTF-8",
  },
  body,
}: {
  statusCode?: number;
  headers?: Record<string, any>;
  body: string;
}) => ({
  statusCode,
  headers,
  body: body,
});
