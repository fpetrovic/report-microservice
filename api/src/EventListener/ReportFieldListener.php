<?php

declare(strict_types=1);

namespace App\EventListener; // @todo or entitylistener?

use App\Entity\Enum\ReportFieldTypeEnum;
use App\Entity\ReportField;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class ReportFieldListener
{
    public function __construct()
    {
    }

    /**
     * @throws \Exception
     */
    public function prePersist(ReportField $reportField, LifecycleEventArgs $event): void
    {
        if ('App\Entity\ReportField' === $reportField::class) {
            $reportFieldWithUpdatedEntityType = ReportFieldTypeEnum::getReportFieldEntityType($reportField->getReportFieldType());

            $reportFieldWithUpdatedEntityType->setName($reportField->getName());
            $reportFieldWithUpdatedEntityType->setSortOrder($reportField->getSortOrder());
            $reportFieldWithUpdatedEntityType->setReportFieldType($reportField->getReportFieldType());

            $entityManager = $event->getObjectManager();
            $entityManager->persist($reportFieldWithUpdatedEntityType);
        }
    }
}
