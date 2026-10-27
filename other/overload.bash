
#!/bin/bash

IMAGE="../picForStego/chal3.jpg"
OUTPUT="../picForStego/chal3_chaos.jpg"
FLAG="ctf{0h_look_you_fouNd_!}"

cp "$IMAGE" "$OUTPUT"


exiftool -all= "$OUTPUT" -overwrite_original

ARGS=()



for i in {1..200}; do
    LEFT="$(head -c 15 /dev/urandom | base64 | tr -dc a-z | head -c 10)"
    RIGHT="$(head -c 60 /dev/urandom | base64 | tr -dc A-Za-z0-9 | head -c 65)"
    ARGS+=("-XMP-dc:Subject+=${LEFT}_oefhq_${RIGHT}")
done


ARGS+=("-XMP-dc:Description=${FLAG}")

for i in {1..200}; do
    LEFT="$(head -c 15 /dev/urandom | base64 | tr -dc a-z | head -c 10)"
    RIGHT="$(head -c 60 /dev/urandom | base64 | tr -dc A-Za-z0-9 | head -c 65)"
    ARGS+=("-XMP-dc:Subject+=${LEFT}_oefhq_${RIGHT}")
done


exiftool "${ARGS[@]}" "$OUTPUT" -overwrite_original


exiftool "$OUTPUT" | grep 'ctf{'

echo "[+] Complete!"
