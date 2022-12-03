<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Report;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GenerateReportFromTemplateController extends AbstractController
{
    public function __construct(private readonly EntityManagerInterface $entityManager)
    {
    }

    public function __invoke(Report $report): Report
    {
        $reportTemplate = $report->getReportTemplateToGenerateFrom();

        $newlyCreatedReport = new Report();

        $newlyCreatedReport->setConfig($report->getConfig());
        $newlyCreatedReport->setSections($reportTemplate->getSections());

        $this->entityManager->persist($newlyCreatedReport);
        $this->entityManager->flush();

        return $newlyCreatedReport;
    }

}
