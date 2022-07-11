export const toResponse = ({
  statusCode,
  headers,
  body,
}: {
  statusCode: number;
  headers: Record<string, any>;
  body: string;
}) => ({
  statusCode,
  headers,
  body,
});
