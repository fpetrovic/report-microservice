<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Enum\ReportFieldTypeEnum;
use App\Entity\ReportTemplate;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;

class ReportTemplateStateProcessor implements ProcessorInterface
{
    public function __construct(
        private readonly EntityManagerInterface $em
    ) {
    }

    /* @throws \Exception
     * @var ReportTemplate $data
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): ReportTemplate
    {
        foreach ($data->getSections() as $reportSection) {
            $updatedEntityTypeReportFields = new ArrayCollection();
            foreach ($reportSection->getReportFields() as $reportField) {
                $updatedEntityTypeReportField = ReportFieldTypeEnum::getReportFieldEntityType($reportField->getReportFieldType());

                !$reportField->getId() ?? $updatedEntityTypeReportField->setId($reportField->getId());

                $updatedEntityTypeReportField->setName($reportField->getName());
                $updatedEntityTypeReportField->setSortOrder($reportField->getSortOrder());
                $updatedEntityTypeReportField->setReportFieldType($reportField->getReportFieldType());
                $updatedEntityTypeReportField->setSection($reportSection);
                $updatedEntityTypeReportFields->add($updatedEntityTypeReportField);
            }

            $reportSection->setReportFields($updatedEntityTypeReportFields);
        }

        $this->em->persist($data);
        $this->em->flush();

        return $data;
    }
}
