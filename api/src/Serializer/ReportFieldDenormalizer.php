<?php

namespace App\Serializer;

use App\Entity\Enum\ReportFieldTypeEnum;
use App\Entity\ReportField;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Normalizer\ContextAwareDenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareTrait;

class ReportFieldDenormalizer implements ContextAwareDenormalizerInterface, DenormalizerAwareInterface
{
    use DenormalizerAwareTrait;

    /**
     * @param mixed      $data
     * @param mixed      $type
     * @param null|mixed $format
     *
     * @throws ExceptionInterface
     * @throws \Exception
     */
    public function denormalize($data, $type, $format = null, array $context = [])
    {
        $entityType = ReportFieldTypeEnum::getReportFieldEntityType($data['reportFieldType']);

        return $this->denormalizer->denormalize($data, $entityType, $format, $context + [__CLASS__ => true]);
    }

    public function supportsDenormalization($data, $type, $format = null, array $context = []): bool
    {
        return \in_array($format, ['json', 'jsonld'], true) && is_a($type, ReportField::class, true) && !isset($context[__CLASS__]);
    }
}
