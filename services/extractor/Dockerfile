# PropertyPilot extractor: reads an ACORD 25 certificate of insurance into JSON.
# Internal only - no published port; the PropertyPilot app is its one caller. Nothing it
# reads leaves this machine: the OCR model is baked into the image at build
# time, and the container needs no network at run time.
FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 DOCTR_CACHE_DIR=/opt/doctr-cache
RUN apt-get update && apt-get install -y --no-install-recommends libgl1 libglib2.0-0 \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --index-url https://download.pytorch.org/whl/cpu torch==2.4.1 torchvision==0.19.1 \
 && pip install --no-cache-dir -r requirements.txt
# Fetch the OCR weights once, at build time, so the running service is offline.
RUN python -c "from doctr.models import ocr_predictor; ocr_predictor(det_arch='db_resnet50', reco_arch='crnn_vgg16_bn', pretrained=True)"
COPY *.py ./
USER nobody
EXPOSE 8080
CMD ["python", "server.py"]
