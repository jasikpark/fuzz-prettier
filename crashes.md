## html idempotency

two null characters (`  `) returns `'\n'`, which formats as an empty file. this is because on first format it's not an empty file, but prettier strips the null characters from the file.
